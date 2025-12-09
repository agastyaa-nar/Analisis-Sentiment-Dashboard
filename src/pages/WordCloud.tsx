import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import stats from "../../../artifacts/wordcloud.json";

type SentimentKey = "positif" | "netral" | "negatif";

type JsonWord = {
  text: string;
  score: number;
  raw_score: number;
};

const MAX_WORDS = 1000;

// mapping array dari JSON → format { text, value } untuk ReactWordcloud
function buildWords(list: JsonWord[]): { text: string; value: number }[] {
  if (!list || list.length === 0) return [];

  // urutkan dari skor terbesar, ambil top N
  const sorted = [...list].sort((a, b) => b.raw_score - a.raw_score);
  const top = sorted.slice(0, MAX_WORDS);

  const min = Math.min(...top.map((w) => w.raw_score));
  const max = Math.max(...top.map((w) => w.raw_score));
  const range = max - min || 1;

  return top.map((w) => {
    const norm = (w.raw_score - min) / range;    // 0–1
    const boosted = Math.pow(norm, 0.4);         // boost supaya beda ukuran kerasa
    const value = 20 + boosted * 100;            // skala 20–120

    return { text: w.text, value };
  });
}

// ambil data per sentimen dari JSON
const wordcloudData = stats.wordcloud as Record<SentimentKey, JsonWord[]>;

const positiveWords = buildWords(wordcloudData.positif);
const neutralWords  = buildWords(wordcloudData.netral);
const negativeWords = buildWords(wordcloudData.negatif);

// summary untuk badge jumlah ulasan
const summary = stats.summary as {
  positif: number;
  netral: number;
  negatif: number;
};

const positiveOptions = {
  rotations: 0,
  rotationAngles: [0, 0] as [number, number],
  fontSizes: [20, 80] as [number, number],
  colors: [
    "hsl(142, 76%, 36%)",
    "hsl(142, 70%, 45%)",
    "hsl(142, 72%, 40%)",
    "hsl(142, 68%, 48%)",
    "hsl(142, 75%, 42%)",
    "hsl(142, 73%, 38%)",
  ],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: "bold",
  padding: 2,
  scale: "sqrt" as const,
  spiral: "archimedean" as const,
  transitionDuration: 1000,
};

const neutralOptions = {
  rotations: 0,
  rotationAngles: [0, 0] as [number, number],
  fontSizes: [20, 80] as [number, number],
  colors: [
    "hsl(215, 16%, 47%)",
    "hsl(215, 18%, 52%)",
    "hsl(215, 15%, 44%)",
    "hsl(215, 17%, 49%)",
    "hsl(215, 19%, 55%)",
    "hsl(215, 16%, 50%)",
  ],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: "bold",
  padding: 2,
  scale: "sqrt" as const,
  spiral: "archimedean" as const,
  transitionDuration: 1000,
};

const negativeOptions = {
  rotations: 0,
  rotationAngles: [0, 0] as [number, number],
  fontSizes: [20, 80] as [number, number],
  colors: [
    "hsl(0, 84%, 60%)",
    "hsl(0, 80%, 55%)",
    "hsl(0, 76%, 50%)",
    "hsl(0, 82%, 58%)",
    "hsl(0, 78%, 52%)",
    "hsl(0, 79%, 54%)",
  ],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: "bold",
  padding: 2,
  scale: "sqrt" as const,
  spiral: "archimedean" as const,
  transitionDuration: 1000,
};

const WordCloudPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Word Cloud Sentimen
          </h1>
          <p className="text-muted-foreground text-lg">
            Visualisasi kata-kata dominan dalam setiap kategori sentimen
          </p>
        </div>

        <div className="space-y-8">
          {/* POSITIF */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-sage-50/20 dark:to-sage-50/5 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sage-100/30 dark:bg-sage-100/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-sage animate-pulse" />
                  <Badge className="bg-gradient-sage text-white border-none px-5 py-2 rounded-full shadow-soft text-sm font-bold">
                    Positif
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
                  {summary.positif.toLocaleString("id-ID")} ulasan
                </span>
              </div>
              <div className="relative h-[600px] w-full p-6 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-sage-100/50 dark:border-sage-100/10 backdrop-blur-sm overflow-hidden">
                <ReactWordcloud words={positiveWords} options={positiveOptions} />
              </div>
            </div>
          </Card>

          {/* NETRAL */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-muted/30 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-muted/30 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground animate-pulse" />
                  <Badge className="bg-muted-foreground text-white border-none px-5 py-2 rounded-full shadow-soft text-sm font-bold">
                    Netral
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
                  {summary.netral.toLocaleString("id-ID")} ulasan
                </span>
              </div>
              <div className="relative h-[600px] w-full p-6 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-muted/50 backdrop-blur-sm overflow-hidden">
                <ReactWordcloud words={neutralWords} options={neutralOptions} />
              </div>
            </div>
          </Card>

          {/* NEGATIF */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-destructive/10 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-destructive/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-destructive to-destructive/70 animate-pulse" />
                  <Badge className="bg-gradient-to-r from-destructive/90 to-destructive text-white border-none px-5 py-2 rounded-full shadow-soft text-sm font-bold">
                    Negatif
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">
                  {summary.negatif.toLocaleString("id-ID")} ulasan
                </span>
              </div>
              <div className="relative h-[600px] w-full p-6 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-destructive/20 backdrop-blur-sm overflow-hidden">
                <ReactWordcloud words={negativeWords} options={negativeOptions} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6 rounded-3xl border-none shadow-soft bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tentang Word Cloud</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Word cloud menampilkan kata-kata yang paling sering muncul dalam ulasan. Ukuran teks menunjukkan bobot relatif berdasarkan skor TF-IDF. Data pada visualisasi ini diambil langsung dari hasil analisis pada notebook (wordcloud.json), sehingga konsisten dengan laporan analitik.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default WordCloudPage;
