import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PredictionResult {
  sentiment: 'Positif' | 'Netral' | 'Negatif';
  confidence: number;
  reason: string;
  keywords: string[];
}

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
      const { data, error } = await supabase.functions.invoke('predict-sentiment', {
        body: { text }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: "Prediksi Berhasil",
        description: `Sentimen terdeteksi: ${data.sentiment}`,
      });
    } catch (error: any) {
      console.error('Error predicting sentiment:', error);
      
      let errorMessage = 'Gagal melakukan prediksi. Silakan coba lagi.';
      if (error.message?.includes('429')) {
        errorMessage = 'Terlalu banyak permintaan. Silakan tunggu sebentar.';
      } else if (error.message?.includes('402')) {
        errorMessage = 'Kredit AI habis. Silakan hubungi administrator.';
      }
      
      toast({
        title: "Terjadi Kesalahan",
        description: errorMessage,
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
            <Card className="p-8 rounded-3xl border-none shadow-soft bg-card animate-slide-up">
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

                {result.keywords && result.keywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Kata Kunci Terdeteksi</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, idx) => (
                        <Badge
                          key={idx}
                          className="px-4 py-2 bg-muted text-foreground border-none rounded-full hover:bg-muted/80 transition-colors"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-6 p-6 rounded-3xl border-none shadow-soft bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">💡 Tentang Prediksi</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Model AI menganalisis teks menggunakan natural language processing</p>
              <p>• Sentimen dikategorikan menjadi: Positif, Netral, atau Negatif</p>
              <p>• Confidence score menunjukkan tingkat kepercayaan prediksi (0-100%)</p>
              <p>• Hasil prediksi dapat membantu memahami persepsi pengguna terhadap aplikasi</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Predict;
