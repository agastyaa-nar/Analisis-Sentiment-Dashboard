import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { AlertCircle, TrendingDown, Shield, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Insights = () => {
  const topIssues = [
    {
      title: "Tidak bisa login",
      count: 3240,
      percentage: 38.6,
      icon: Shield,
      color: "text-destructive",
    },
    {
      title: "Error saat membuka aplikasi",
      count: 2180,
      percentage: 26.0,
      icon: AlertCircle,
      color: "text-destructive",
    },
    {
      title: "Lambat memuat data",
      count: 1560,
      percentage: 18.6,
      icon: TrendingDown,
      color: "text-destructive",
    },
    {
      title: "Gagal sinkronisasi",
      count: 890,
      percentage: 10.6,
      icon: Zap,
      color: "text-destructive",
    },
    {
      title: "Aplikasi force close",
      count: 530,
      percentage: 6.3,
      icon: AlertCircle,
      color: "text-destructive",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Insights & Rekomendasi
          </h1>
          <p className="text-muted-foreground text-lg">Analisis mendalam masalah utama dan rekomendasi perbaikan</p>
        </div>

        {/* Summary Alert */}
        <Card className="p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-destructive/10 to-transparent mb-8 animate-slide-up hover:shadow-glow transition-all duration-500 border-l-4 border-l-destructive">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center flex-shrink-0 shadow-lg">
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-3">Perhatian Khusus Diperlukan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Berdasarkan analisis <span className="font-semibold text-destructive">8.400 ulasan negatif</span>, ditemukan 5 masalah kritis yang memerlukan penanganan segera. 
                Masalah login mendominasi dengan <span className="font-semibold text-destructive">38.6%</span> dari total keluhan negatif.
              </p>
            </div>
          </div>
        </Card>

        {/* Top Issues */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-6">Top 5 Masalah Terbanyak</h2>
          <div className="space-y-5">
            {topIssues.map((issue, index) => {
              const Icon = issue.icon;
              return (
                <Card 
                  key={index}
                  className="p-7 rounded-3xl border-none shadow-soft bg-card hover:shadow-glow transition-all duration-500 hover:scale-[1.02] group"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-gradient-warm text-white border-none px-4 py-1.5 rounded-full shadow-md font-semibold">
                            #{index + 1}
                          </Badge>
                          <h3 className="text-xl font-bold text-foreground">{issue.title}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-muted-foreground">
                            {issue.count.toLocaleString()} keluhan
                          </span>
                          <div className="flex-1 max-w-md">
                            <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                              <div
                                className="h-full bg-gradient-to-r from-destructive/80 to-destructive rounded-full transition-all duration-500"
                                style={{ width: `${issue.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-foreground">{issue.percentage}%</div>
                      <div className="text-xs text-muted-foreground">dari total</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6">Rekomendasi Perbaikan</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-sage-50 to-transparent rounded-2xl">
              <h4 className="font-semibold text-foreground mb-2">🎯 Prioritas Tinggi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Perbaiki sistem autentikasi dan login. Implementasi mekanisme retry otomatis dan pesan error yang lebih informatif.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-warm-100 to-transparent rounded-2xl">
              <h4 className="font-semibold text-foreground mb-2">⚡ Optimasi Performa</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tingkatkan kecepatan loading dengan implementasi caching dan lazy loading untuk data besar.
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-2xl">
              <h4 className="font-semibold text-foreground mb-2">🔧 Stabilitas Aplikasi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Perkuat error handling dan implementasi crash reporting untuk identifikasi bug lebih cepat.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Insights;
