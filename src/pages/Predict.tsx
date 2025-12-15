import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, TrendingUp, TrendingDown, Minus, AlertCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PredictionResult {
  sentiment: 'Positif' | 'Netral' | 'Negatif';
  confidence: number;
  reason: string;
  keywords: string[];
  probs?: {              
    positif: number;     
    netral: number;
    negatif: number;
  };
}

const PIE_COLORS: Record<string, string> = {
  Positif: "hsl(142, 76%, 40%)",
  Netral: "hsl(215, 16%, 47%)",
  Negatif: "hsl(0, 84%, 60%)",
  Uncertainty: "hsl(var(--muted))",
};

const Predict = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positif':
        return <TrendingUp className="w-6 h-6" />;
      case 'Negatif':
        return <TrendingDown className="w-6 h-6" />;
      default:
        return <Minus className="w-6 h-6" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positif':
        return 'bg-gradient-sage text-white';
      case 'Negatif':
        return 'bg-gradient-to-r from-destructive/80 to-destructive text-white';
      default:
        return 'bg-muted-foreground text-white';
    }
  };

  const getSentimentBgColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positif':
        return 'from-sage-50 to-transparent';
      case 'Negatif':
        return 'from-destructive/10 to-transparent';
      default:
        return 'from-muted to-transparent';
    }
  };

  const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
  ).replace(/\/$/, "");

  type NbApiResponse = {
    sentiment: "positif" | "netral" | "negatif"; // dari model NB
    confidence: number;
    reason?: string;
    keywords?: string[];
  };

  type UISentiment = "Positif" | "Netral" | "Negatif";

  const SENTIMENT_MAP: Record<NbApiResponse["sentiment"], UISentiment> = {
    positif: "Positif",
    netral: "Netral",
    negatif: "Negatif",
  };

  const handlePredict = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Kosong",
        description: "Silakan masukkan teks ulasan untuk dianalisis",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data as PredictionResult);
      console.log("NB DEBUG:", (data as any).nb_debug);

      toast({
        title: "Prediksi Berhasil",
        description: `Sentimen terdeteksi: ${data.sentiment}`,
      });
    } catch (error: any) {
      console.error("Error predicting sentiment:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal melakukan prediksi. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const examples = [
    "Aplikasi sangat membantu dan mudah digunakan!",
    "Tidak bisa login, selalu error",
    "Update versi terbaru sudah tersedia",
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Prediction</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Prediksi Sentimen Real-Time</h1>
            <p className="text-muted-foreground">
              Masukkan teks ulasan dan dapatkan prediksi sentimen secara instan menggunakan AI
            </p>
          </div>

          {/* Input Section */}
          <Card className="p-8 rounded-3xl border-none shadow-soft mb-6 bg-card">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teks Ulasan
                </label>
                <Textarea
                  placeholder="Contoh: Aplikasi sangat membantu dan mudah digunakan..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[150px] rounded-2xl border-border focus:ring-2 focus:ring-primary resize-none"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {text.length} karakter
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Contoh cepat:</span>
                {examples.map((example, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => setText(example)}
                    disabled={isLoading}
                    className="rounded-full text-xs"
                  >
                    {example.substring(0, 30)}...
                  </Button>
                ))}
              </div>

              <Button
                onClick={handlePredict}
                disabled={isLoading || !text.trim()}
                className="w-full bg-gradient-warm text-white rounded-2xl py-6 text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105 border-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Prediksi Sentimen
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Result Section */}
          {result && (
            <div className="space-y-6 animate-slide-up">
              {/* Main Result Card */}
              <Card className="p-8 rounded-3xl border-none shadow-soft bg-card">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Hasil Prediksi</h3>
                    
                    <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-3xl ${getSentimentColor(result.sentiment)} shadow-soft mb-4`}>
                      {getSentimentIcon(result.sentiment)}
                      <span className="text-2xl font-bold">{result.sentiment}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">Confidence Score:</span>
                      <Badge className="px-4 py-1 text-base font-semibold bg-gradient-warm text-white border-none rounded-full">
                        {result.confidence}%
                      </Badge>
                    </div>

                    {/* Confidence Bar */}
                    <div className="max-w-md mx-auto">
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-warm rounded-full transition-all duration-500"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 bg-gradient-to-br ${getSentimentBgColor(result.sentiment)} rounded-2xl`}>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Alasan Prediksi</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{result.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Visualization Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sentiment Distribution Chart */}
                <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">
                      Distribusi Probabilitas Sentimen
                    </h4>
                  </div>

                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={
                          result.probs
                            ? [
                                { name: "Positif", value: result.probs.positif * 100 },
                                { name: "Netral", value: result.probs.netral * 100 },
                                { name: "Negatif", value: result.probs.negatif * 100 },
                              ]
                            : [
                                // fallback kalau (sementara) backend belum ada probs
                                { name: result.sentiment, value: result.confidence },
                                { name: "Uncertainty", value: 100 - result.confidence },
                              ]
                        }
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {(
                          result.probs
                            ? ["Positif", "Netral", "Negatif"]
                            : [result.sentiment, "Uncertainty"]
                        ).map((name) => (
                          <Cell
                            key={name}
                            fill={PIE_COLORS[name] ?? "hsl(var(--muted))"}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          `${(value as number).toFixed(1)}%`,
                          name,
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>

                  {result.probs && (
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-emerald-600">Positif</span>
                        <span>{(result.probs.positif * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-slate-600">Netral</span>
                        <span>{(result.probs.netral * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-red-600">Negatif</span>
                        <span>{(result.probs.negatif * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Word Cloud */}
                {result.keywords && result.keywords.length > 0 && (
                  <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">Kata Kunci Terdeteksi</h4>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
                      {result.keywords.map((keyword, idx) => {
                        const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
                        const size = sizes[idx % sizes.length];
                        const opacity = 1 - (idx * 0.15);
                        return (
                          <Badge
                            key={idx}
                            className={`${size} px-4 py-2 bg-gradient-warm text-white border-none rounded-full hover:scale-110 transition-transform cursor-default shadow-soft`}
                            style={{ opacity: Math.max(opacity, 0.4) }}
                          >
                            {keyword}
                          </Badge>
                        );
                      })}
                    </div>
                  </Card>
                )}
              </div>

              {/* Sentiment Categories Info */}
              <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
                <h4 className="font-semibold text-foreground mb-4">Kategori Sentimen</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-sage-50 to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-sage-600" />
                      <span className="font-semibold text-foreground">Positif</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Ulasan yang menunjukkan kepuasan dan pengalaman baik</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-muted to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <Minus className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold text-foreground">Netral</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Ulasan informatif tanpa sentimen jelas</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-destructive/10 to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-destructive" />
                      <span className="font-semibold text-foreground">Negatif</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Ulasan yang menunjukkan keluhan dan ketidakpuasan</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Info Card */}
          <Card className="mt-6 p-6 rounded-3xl border-none shadow-soft bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">💡 Tentang Prediksi</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Sistem menggunakan pendekatan <span className="font-semibold">hybrid</span> antara model Multinomial Naive Bayes dan model generatif (Gemini).</p>
              <p>• <span className="font-semibold">Naive Bayes</span> bertugas mengklasifikasikan ulasan ke dalam tiga kategori sentimen: Positif, Netral, atau Negatif.</p>
              <p>• <span className="font-semibold">Gemini</span> digunakan sebagai modul penjelas untuk memberikan alasan (reason) dan mengekstraksi kata kunci penting dari teks ulasan.</p>
              <p>• Confidence score berasal dari probabilitas tertinggi model Naive Bayes (0–100%), sedangkan chart distribusi menunjukkan probabilitas ketiga kelas sentimen.</p>
              <p>• Hasil prediksi dan penjelasan membantu tim memahami persepsi pengguna serta mengidentifikasi area perbaikan pada aplikasi.</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Predict;
