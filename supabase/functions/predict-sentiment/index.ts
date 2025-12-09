import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MODEL_API_URL =
  Deno.env.get("MODEL_API_URL") ?? "http://127.0.0.1:8000";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";

type NbSentiment = "negatif" | "netral" | "positif";
type UiSentiment = "Negatif" | "Netral" | "Positif";

const SENTIMENT_MAP: Record<NbSentiment, UiSentiment> = {
  negatif: "Negatif",
  netral: "Netral",
  positif: "Positif",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return new Response(
        JSON.stringify({ error: "Teks tidak boleh kosong" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log("➡️ Edge menerima teks:", text.substring(0, 80) + "...");
    console.log("➡️ MODEL_API_URL:", MODEL_API_URL);

    // 1️⃣ Panggil API Naive Bayes (backend kamu)
    const nbResp = await fetch(`${MODEL_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    console.log("➡️ NB status code:", nbResp.status);

    if (!nbResp.ok) {
      const errBody = await nbResp.text();
      console.error("NB API ERROR:", nbResp.status, errBody);

      return new Response(
        JSON.stringify({
          error: "Gagal memproses prediksi dari model Naive Bayes",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const nbResult = await nbResp.json();
    console.log("✅ NB RESULT (raw):", nbResult);

    const nbSentiment: NbSentiment = nbResult.sentiment ?? "netral";
    const nbConfidence: number = nbResult.confidence ?? 70;
    const uiSentiment: UiSentiment =
      SENTIMENT_MAP[nbSentiment] ?? "Netral";

    // 2️⃣ Kalau ga ada LOVABLE_API_KEY → pakai NB saja (tanpa Gemini)
    if (!LOVABLE_API_KEY) {
      console.warn("⚠️ LOVABLE_API_KEY tidak ditemukan, skip Gemini.");

      const fallback = {
        sentiment: uiSentiment,
        confidence: nbConfidence,
        reason:
          "Prediksi berdasarkan model Multinomial Naive Bayes yang dilatih pada ulasan SIREKAP.",
        keywords: [],
        nb_debug: nbResult, // <— buat cek di FE/log
      };

      return new Response(
        JSON.stringify(fallback),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3️⃣ Panggil Gemini hanya untuk reason + keywords
    const systemPrompt = `Kamu adalah modul PENJELAS untuk sistem analisis sentimen ulasan aplikasi SIREKAP.

Model utama (Multinomial Naive Bayes) SUDAH MENENTUKAN label sentimen ulasan.
Label final dari model utama adalah: "${uiSentiment}" (Positif/Netral/Negatif).

Tugas kamu HANYA:
- Menjelaskan alasan (reason) kenapa ulasan ini masuk kategori tersebut
- Mengambil kata/frasa kunci penting (keywords) dari ulasan
- (Opsional) memberikan confidence versimu sendiri

ATURAN PENTING:
- Jangan mengubah label sentimen final.
- Jangan menulis apapun di luar JSON.

Format respons WAJIB:
{
  "sentiment": "Positif" | "Netral" | "Negatif",
  "confidence": <angka 0-100>,
  "reason": "penjelasan singkat mengapa dikategorikan demikian",
  "keywords": ["kata1", "kata2", "kata3"]
}`;

    const geminiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content:
                `Ulasan pengguna: "${text}". Jelaskan alasan dan daftar kata kunci.`,
            },
          ],
          temperature: 0.3,
        }),
      },
    );

    if (!geminiResp.ok) {
      const errorText = await geminiResp.text();
      console.error("Gemini API error:", geminiResp.status, errorText);

      const fallback = {
        sentiment: uiSentiment,
        confidence: nbConfidence,
        reason:
          "Prediksi berdasarkan model Multinomial Naive Bayes. Modul penjelas (Gemini) gagal dipanggil.",
        keywords: [],
        nb_debug: nbResult,
      };

      return new Response(
        JSON.stringify(fallback),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const gemData = await geminiResp.json();
    console.log("📩 Respons mentah Gemini:", JSON.stringify(gemData));

    const aiContent: string = gemData.choices?.[0]?.message?.content ?? "";

    // 4️⃣ Parse JSON dari Gemini
    let gemResult: any = {};
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        gemResult = JSON.parse(jsonMatch[0]);
      } else if (aiContent.trim().startsWith("{")) {
        gemResult = JSON.parse(aiContent);
      } else {
        throw new Error("Tidak menemukan JSON valid di respons Gemini");
      }
    } catch (parseErr) {
      console.error("Error parsing JSON dari Gemini:", parseErr);
      gemResult = {};
    }

    const finalResult = {
      sentiment: uiSentiment, // 🔒 LABEL FIX dari NB
      confidence: nbConfidence ?? gemResult.confidence ?? 70,
      reason:
        gemResult.reason ??
        "Prediksi berdasarkan model Multinomial Naive Bayes yang dilatih pada ulasan SIREKAP.",
      keywords: Array.isArray(gemResult.keywords) ? gemResult.keywords : [],
      nb_debug: nbResult, // <— untuk cek di FE/log
    };

    console.log("✅ HASIL FINAL HYBRID:", finalResult);

    return new Response(
      JSON.stringify(finalResult),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("💥 Error di predict-sentiment hybrid:", err);
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan internal";

    return new Response(
      JSON.stringify({ error: msg }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
