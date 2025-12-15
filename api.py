from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import uvicorn
import os
import requests
from dotenv import load_dotenv
import re
import json as pyjson

# === Tambahan untuk preprocessing ===
import emoji
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory
from nltk.tokenize import word_tokenize
import nltk

# === Load env (GEMINI_API_KEY dari .env) ===
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")


class PredictRequest(BaseModel):
    text: str


# === Load model & TF-IDF ===
# Path relatif dari lokasi api.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
tfidf = joblib.load(os.path.join(BASE_DIR, "artifacts", "tfidf_vectorizer.pkl"))
nb_model = joblib.load(os.path.join(BASE_DIR, "artifacts", "naive_bayes_optimized.pkl"))

print("API classes:", nb_model.classes_)
print("API tfidf vocab size:", len(tfidf.vocabulary_))


app = FastAPI()

# === CORS: dev + nanti bisa dibatasi ke domain Vercel ===
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    # nanti kalau sudah deploy FE di Vercel, tambahin:
    # "https://nama-frontend-kamu.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # boleh dipersempit nanti ke origins kalau sudah produksi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("GEMINI_API_KEY loaded:", bool(GEMINI_API_KEY))
print("GEMINI_API_KEY prefix:", GEMINI_API_KEY[:8] if GEMINI_API_KEY else "NONE")

# ========== PREPROCESSING (SAMA DENGAN NOTEBOOK) ==========
stemmer = StemmerFactory().create_stemmer()
stop_factory = StopWordRemoverFactory()
stopwords = set(stop_factory.get_stop_words())

# Ensure NLTK punkt is available in production
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    try:
        nltk.download('punkt')
    except Exception:
        print("Warning: failed to download NLTK 'punkt'. Tokenization may fail.")

# Pertahankan kata negasi / pengubah
negation_words = {"tidak", "bukan", "kurang", "belum", "tak"}
stopwords = stopwords - negation_words

URL_RE = re.compile(r"http\S+|www\.\S+")
NON_ALPHA = re.compile(r"[^a-z\s]")
EMOJI_RE = re.compile(r"[\U00010000-\U0010ffff]", flags=re.UNICODE)


def simple_preprocess(text: str) -> str:
    """
    Preprocessing teks untuk prediksi:
    - lowercase
    - hapus URL & emoji
    - hapus karakter non-huruf
    - tokenisasi
    - buang stopword (kecuali kata negasi)
    - stemming Sastrawi
    """
    if not isinstance(text, str) or text.strip() == "":
        return ""
    text = text.lower()
    text = URL_RE.sub(" ", text)
    text = emoji.replace_emoji(text, replace=" ")
    text = NON_ALPHA.sub(" ", text)
    text = EMOJI_RE.sub(" ", text)
    tokens = [t for t in word_tokenize(text) if t not in stopwords and len(t) > 1]
    return " ".join(stemmer.stem(t) for t in tokens)
# ==========================================================


def call_gemini_direct(ui_sentiment: str, text: str):
    """
    Panggil Gemini langsung (Generative Language API) untuk bikin reason + keywords.
    Kalau gagal → fallback ke default.
    """
    if not GEMINI_API_KEY:
        print("⚠️ GEMINI_API_KEY kosong, skip Gemini")
        return {
            "reason": (
                "Prediksi berdasarkan model Multinomial Naive Bayes yang "
                "dilatih pada ulasan SIREKAP."
            ),
            "keywords": [],
        }

    # ✅ Pakai model baru: gemini-2.5-flash, endpoint v1beta
    url = (
        "https://generativelanguage.googleapis.com/v1beta/"
        "models/gemini-2.5-flash:generateContent"
    )

    system_prompt = f"""Kamu adalah modul PENJELAS untuk sistem analisis sentimen ulasan aplikasi SIREKAP.

Model utama (Multinomial Naive Bayes) SUDAH MENENTUKAN label sentimen ulasan.
Label final dari model utama adalah: "{ui_sentiment}" (Positif/Netral/Negatif).

Tugas kamu HANYA:
- Menjelaskan alasan (reason) kenapa ulasan ini masuk kategori tersebut
- Mengambil kata/frasa kunci penting (keywords) dari ulasan
- (Opsional) memberikan confidence versimu sendiri

ATURAN PENTING:
- Jangan mengubah label sentimen final.
- Jangan menulis apapun di luar JSON.

Format respons WAJIB:
{{
  "sentiment": "Positif" | "Netral" | "Negatif",
  "confidence": <angka 0-100>,
  "reason": "penjelasan singkat mengapa dikategorikan demikian",
  "keywords": ["kata1", "kata2", "kata3", "kata4", "kata5"]
}}"""

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": (
                            system_prompt
                            + "\n\n"
                            + f'Ulasan pengguna: "{text}". '
                            "Kembalikan JSON sesuai format."
                        )
                    }
                ],
            }
        ]
    }

    try:
        resp = requests.post(
            url,
            headers={
                "x-goog-api-key": GEMINI_API_KEY,  # ⬅️ pakai header, bukan ?key=
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=20,
        )

        print("🌐 Gemini HTTP status:", resp.status_code)

        if not resp.ok:
            print("❌ Gemini error body:", resp.text[:600])
            return {
                "reason": (
                    "Prediksi berdasarkan model Multinomial Naive Bayes. "
                    "Modul penjelas (Gemini) gagal dipanggil."
                ),
                "keywords": [],
            }

        data = resp.json()
        candidates = data.get("candidates", [])
        if not candidates:
            print("❌ Gemini: tidak ada candidates")
            raise ValueError("Tidak ada kandidat dari Gemini")

        parts = candidates[0].get("content", {}).get("parts", [])
        if not parts:
            print("❌ Gemini: tidak ada parts di content")
            raise ValueError("Tidak ada parts di content Gemini")

        out_text = parts[0].get("text", "")
        print("📄 Gemini raw text:", out_text[:200].replace("\n", " "))

        match = re.search(r"\{[\s\S]*\}", out_text)
        if not match:
            print("❌ Gemini: JSON tidak ditemukan dalam teks")
            raise ValueError("JSON tidak ditemukan")

        parsed = pyjson.loads(match.group(0))

        return {
            "reason": parsed.get(
                "reason",
                "Prediksi berdasarkan model Multinomial Naive Bayes "
                "yang dilatih pada ulasan SIREKAP.",
            ),
            "keywords": parsed.get("keywords", []) or [],
        }

    except Exception as e:
        print("❌ Exception Gemini:", repr(e))
        return {
            "reason": (
                "Prediksi berdasarkan model Multinomial Naive Bayes. "
                "Modul penjelas (Gemini) gagal dipanggil."
            ),
            "keywords": [],
        }


@app.post("/predict")
async def predict(req: Request, body: PredictRequest):
    text = body.text

    if not text or not text.strip():
        return {"error": "Teks tidak boleh kosong"}

    # === 0. Preprocessing (HARUS sama dengan training) ===
    clean_text = simple_preprocess(text)

    if not clean_text.strip():
        return {
            "error": (
                "Teks terlalu pendek atau tidak mengandung kata bermakna "
                "setelah preprocessing."
            )
        }

    # === 1. Prediksi NB ===
    X = tfidf.transform([clean_text])
    proba = nb_model.predict_proba(X)[0]
    classes = nb_model.classes_

    # dict: {"negatif": 0.xx, "netral": 0.yy, "positif": 0.zz}
    probs_raw = dict(zip(classes, proba))

    idx_max = int(np.argmax(proba))
    raw_label: str = classes[idx_max]

    print("======================================")
    print("NB PREDICT CALLED")
    print("  FROM       :", req.client.host, ":", req.client.port)
    print("  TEXT RAW   :", text)
    print("  TEXT CLEAN :", clean_text)
    print("  LABEL      :", raw_label)
    print("  PROBA      :", proba.tolist())
    print("======================================")

    # mapping label NB → format UI
    ui_map = {"negatif": "Negatif", "netral": "Netral", "positif": "Positif"}
    ui_sentiment = ui_map.get(raw_label, "Netral")
    nb_conf = round(float(proba[idx_max] * 100), 2)

    # Gemini tetap pakai teks asli (biar alasan lebih natural)
    gem = call_gemini_direct(ui_sentiment, text)

    return {
        "sentiment": ui_sentiment,
        "confidence": nb_conf,
        "reason": gem["reason"],
        "keywords": gem["keywords"],
        "probs": {
            "positif": float(probs_raw.get("positif", 0.0)),
            "netral": float(probs_raw.get("netral", 0.0)),
            "negatif": float(probs_raw.get("negatif", 0.0)),
        },
        "nb_debug": {
            "raw_label": raw_label,
            "classes": classes.tolist(),
            "proba": proba.tolist(),
            "clean_text": clean_text,
        },
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("api:app", host="0.0.0.0", port=port, reload=True)
