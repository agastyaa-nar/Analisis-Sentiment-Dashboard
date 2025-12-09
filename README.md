# 🎯 SIREKAP Sentiment Analysis System

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10.12-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?logo=fastapi)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Sistem analisis sentimen ulasan aplikasi SIREKAP menggunakan Machine Learning dan AI**

[Demo](#-quick-start) • [Features](#-fitur-utama) • [Installation](#-instalasi-lokal) • [API Docs](#-dokumentasi-api) • [Deployment](#-deployment)

</div>

---

## 📖 Tentang Project

Project **Kerja Praktik** di **KPU Provinsi Jawa Timur** untuk menganalisis sentimen ulasan aplikasi SIREKAP (Sistem Informasi Rekapitulasi) dari Google Play Store.

### 🎯 Tujuan
- Menganalisis persepsi publik terhadap aplikasi SIREKAP
- Mengidentifikasi masalah dan keluhan pengguna
- Memberikan insights untuk perbaikan aplikasi

### 🔬 Metodologi
- **Data Collection**: Web scraping Google Play Store (20,281 ulasan)
- **Text Processing**: Sastrawi stemming, stopword removal, tokenization
- **Model**: Multinomial Naive Bayes dengan TF-IDF vectorization
- **AI Enhancement**: Google Gemini 2.5 Flash untuk reasoning & keyword extraction

---

## ✨ Fitur Utama

### 🤖 Real-Time Sentiment Prediction
- Prediksi sentimen otomatis (Positif/Netral/Negatif)
- Confidence score dengan visualisasi
- Explanation reasoning menggunakan Gemini AI
- Keyword extraction otomatis

### 📊 Analytics Dashboard
- Statistik sentimen overview
- Distribusi rating 1-5 bintang
- Trend perubahan sentimen
- Top keywords per kategori

### ☁️ Word Cloud Visualization
- Word cloud terpisah untuk tiap sentimen
- Interactive visualization dengan D3.js
- Kata dominan dengan TF-IDF scoring

### 💡 Insights & Recommendations
- Top-5 masalah terbanyak
- Analisis keluhan utama
- Rekomendasi perbaikan

### 📈 Model Performance
- Confusion matrix visualization
- Accuracy, Precision, Recall, F1-Score
- Cross-validation results

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.10.12)
- **ML/NLP**: Scikit-learn, NLTK, Sastrawi
- **Model**: Multinomial Naive Bayes + TF-IDF
- **AI**: Google Gemini 2.5 Flash API
- **Data**: Pandas, NumPy, Joblib

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn-ui + Tailwind CSS
- **Charts**: Recharts, D3.js
- **State**: TanStack React Query
- **Routing**: React Router

### Deployment
- **Backend**: Railway / Render
- **Frontend**: Vercel
- **Database**: Supabase (optional)

---

## 📦 Instalasi Lokal

### Prasyarat
- Python 3.10.12
- Node.js 18.x atau lebih tinggi
- Git
- Google Gemini API Key ([dapatkan di sini](https://aistudio.google.com/app/apikey))

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/sirekap-sentiment-analysis.git
cd sirekap-sentiment-analysis
```

### 2️⃣ Setup Backend (FastAPI)

```bash
# Install dependencies
pip install -r requirements.txt

# Download NLTK data (first time only)
python -c "import nltk; nltk.download('punkt')"

# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Verify model files exist
ls -lh artifacts/
# Harus ada: tfidf_vectorizer.pkl, naive_bayes_optimized.pkl

# Run development server
python -m uvicorn api:app --host 0.0.0.0 --port 8000 --reload
```

Backend akan berjalan di: **http://localhost:8000**

**Test endpoints:**
- Root: http://localhost:8000/
- Health: http://localhost:8000/health
- Docs: http://localhost:8000/docs (Interactive API documentation)

### 3️⃣ Setup Frontend (React + Vite)

```bash
# Navigate to frontend folder
cd pastel-sentiment-glow

# Install dependencies
npm install

# Create .env file for development
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# Run development server
npm run dev
```

Frontend akan berjalan di: **http://localhost:8080**

### 4️⃣ Access Application

Buka browser dan akses:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 🚀 Quick Start

### Quick Test dengan cURL

```bash
# Test sentiment prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"Aplikasi sangat membantu dan mudah digunakan"}'

# Response:
{
  "sentiment": "Positif",
  "confidence": 87.5,
  "reason": "Ulasan menunjukkan kepuasan dengan kata 'sangat membantu' dan 'mudah digunakan'",
  "keywords": ["aplikasi", "membantu", "mudah", "digunakan"],
  "probs": {
    "positif": 0.875,
    "netral": 0.100,
    "negatif": 0.025
  }
}
```

### Quick Test dengan Python

```python
import requests

response = requests.post(
    "http://localhost:8000/predict",
    json={"text": "Tidak bisa login, selalu error"}
)

print(response.json())
# Output: {"sentiment": "Negatif", "confidence": 92.3, ...}
```

---

## 📚 Dokumentasi API

### Base URL
- **Local**: `http://localhost:8000`
- **Production**: `https://your-backend.railway.app`

### Endpoints

#### `GET /`
**Root endpoint** - Informasi API

**Response:**
```json
{
  "name": "SIREKAP Sentiment Analysis API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "health": "/health",
    "predict": "/predict"
  }
}
```

#### `GET /health`
**Health check** - Status sistem dan model

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "tfidf_loaded": true,
  "gemini_api_configured": true
}
```

#### `POST /predict`
**Sentiment prediction** - Analisis sentimen teks

**Request Body:**
```json
{
  "text": "Aplikasi bagus tapi sering crash"
}
```

**Response:**
```json
{
  "sentiment": "Netral",
  "confidence": 65.8,
  "reason": "Ulasan menunjukkan apresiasi ('bagus') namun ada keluhan ('sering crash')",
  "keywords": ["aplikasi", "bagus", "crash", "sering"],
  "probs": {
    "positif": 0.30,
    "netral": 0.658,
    "negatif": 0.042
  },
  "nb_debug": {
    "raw_label": "netral",
    "classes": ["negatif", "netral", "positif"],
    "proba": [0.042, 0.658, 0.30],
    "clean_text": "aplik bagus crash"
  }
}
```

**Error Response:**
```json
{
  "error": "Teks tidak boleh kosong"
}
```

---

## 📂 Struktur Project

```
sirekap-sentiment-analysis/
├── 📄 api.py                          # FastAPI backend server
├── 📄 requirements.txt                # Python dependencies
├── 📄 Procfile                        # Deployment config (Railway/Heroku)
├── 📄 runtime.txt                     # Python version
├── 📄 .env                           # Environment variables (local)
├── 📓 SIREKAP_Sentiment_Analysis.ipynb # Jupyter notebook (ML pipeline)
│
├── 📁 artifacts/                      # ML models & vectorizers
│   ├── naive_bayes_optimized.pkl      # Trained Naive Bayes model
│   ├── tfidf_vectorizer.pkl           # TF-IDF vectorizer
│   ├── classification_report.txt      # Model evaluation
│   └── vocab_top_terms.csv            # Top keywords
│
├── 📁 data/                           # Dataset files
│   ├── raw_reviews.csv                # Original scraped reviews
│   ├── clean_reviews.csv              # Preprocessed data
│   └── scrape_state.json              # Scraping checkpoint
│
├── 📁 images/                         # Visualizations
│   ├── WC_pos.png                     # Word cloud - Positive
│   ├── WC_neg.png                     # Word cloud - Negative
│   ├── confusion_matrix_nb.png        # Confusion matrix
│   └── distribusi_sentimen_awal.png   # Sentiment distribution
│
├── 📁 pastel-sentiment-glow/         # Frontend application
│   ├── 📁 src/
│   │   ├── 📁 pages/
│   │   │   ├── Index.tsx              # Landing page
│   │   │   ├── Dashboard.tsx          # Analytics dashboard
│   │   │   ├── Predict.tsx            # Prediction page
│   │   │   ├── WordCloud.tsx          # Word cloud viz
│   │   │   └── Insights.tsx           # Insights & recommendations
│   │   ├── 📁 components/             # Reusable components
│   │   ├── 📁 hooks/                  # Custom React hooks
│   │   └── App.tsx                    # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   ├── vercel.json                    # Vercel deployment config
│   └── .env.production
│
├── 📄 DEPLOYMENT.md                   # Deployment guide (300+ lines)
├── 📄 QUICK-DEPLOY.md                 # Quick deployment reference
├── 📄 README.md                       # This file
└── 📄 .gitignore
```

---

## 🔬 Model Details

### Dataset
- **Source**: Google Play Store (SIREKAP app)
- **Total Reviews**: 20,281
- **Period**: 2024 (Pemilu)
- **Label Distribution**:
  - Negatif: ~68%
  - Netral: ~20%
  - Positif: ~12%

### Preprocessing Pipeline
1. **Lowercasing**: Normalisasi teks
2. **URL & Emoji Removal**: Hapus noise
3. **Non-alpha Removal**: Hanya huruf dan spasi
4. **Tokenization**: NLTK word_tokenize
5. **Stopword Removal**: Sastrawi (kecuali kata negasi)
6. **Stemming**: Sastrawi Stemmer

### Model Performance
- **Algorithm**: Multinomial Naive Bayes
- **Vectorization**: TF-IDF (max_features=5000)
- **Accuracy**: ~85-90% (on test set)
- **Cross-validation**: 5-fold CV

### Hybrid Approach
1. **Naive Bayes**: Klasifikasi sentimen (primary)
2. **Gemini AI**: Reasoning & keyword extraction (secondary)

---

## 🎨 Screenshots

### Landing Page
![Landing Page](images/screenshot-landing.png)

### Prediction Interface
![Prediction](images/screenshot-predict.png)

### Dashboard Analytics
![Dashboard](images/screenshot-dashboard.png)

### Word Cloud
![Word Cloud](images/WC_pos.png)

---

## 🚀 Deployment

### Deploy ke Production

Lihat panduan lengkap di:
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Panduan lengkap 300+ baris
- **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** - Quick reference

### Quick Deployment

**Backend (Railway):**
```bash
# Push to GitHub first, then:
1. https://railway.app → New Project → Deploy from GitHub
2. Set GEMINI_API_KEY environment variable
3. Done! Copy backend URL
```

**Frontend (Vercel):**
```bash
# Update .env.production with backend URL, then:
1. https://vercel.com → Import Project
2. Root directory: pastel-sentiment-glow
3. Add environment variables
4. Deploy!
```

---

## 📝 Development

### Run Backend Tests

```bash
# Test health check
curl http://localhost:8000/health

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text":"Test ulasan"}'
```

### Run Frontend in Dev Mode

```bash
cd pastel-sentiment-glow
npm run dev
```

### Build for Production

```bash
# Backend (nothing to build, Python runs directly)

# Frontend
cd pastel-sentiment-glow
npm run build
npm run preview  # Test production build locally
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'sastrawi'`
```bash
pip install -r requirements.txt
```

**Problem**: `FileNotFoundError: artifacts/naive_bayes_optimized.pkl`
```bash
# Model files harus ada di folder artifacts/
# Pastikan folder artifacts/ di-commit ke Git
```

**Problem**: `GEMINI_API_KEY not found`
```bash
# Buat file .env di root directory
echo "GEMINI_API_KEY=your_key_here" > .env
```

### Frontend Issues

**Problem**: `Cannot connect to API`
```bash
# Pastikan backend berjalan di localhost:8000
# Check .env file:
echo "VITE_API_BASE_URL=http://localhost:8000" > pastel-sentiment-glow/.env
```

**Problem**: `npm install failed`
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Dataset Information

Dataset ulasan SIREKAP dapat digunakan untuk:
- Sentiment analysis research
- Indonesian NLP preprocessing
- Machine learning classification

**Cara regenerate dataset:**
```python
# Jalankan notebook: SIREKAP_Sentiment_Analysis.ipynb
# Atau via Python:
from google_play_scraper import reviews

result, _ = reviews(
    'id.go.kpu.sirekap2024',
    lang='id',
    country='id',
    count=1000
)
```

---

## 🤝 Contributing

Project ini adalah bagian dari Kerja Praktik. Untuk kontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👨‍💻 Author

**Dhanar** - Kerja Praktik KPU Provinsi Jawa Timur

---

## 🙏 Acknowledgments

- **KPU Provinsi Jawa Timur** - Tempat Kerja Praktik
- **Google Play Scraper** - Data collection tool
- **Sastrawi** - Indonesian NLP library
- **Google Gemini** - AI reasoning engine
- **Lovable** - Frontend development platform

---

## 📞 Support

Untuk pertanyaan atau masalah:
- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/sirekap-sentiment-analysis/issues)
- **Email**: your.email@example.com
- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ for KPU Jawa Timur

</div>
