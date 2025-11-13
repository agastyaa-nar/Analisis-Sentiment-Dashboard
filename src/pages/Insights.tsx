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
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Insights & Rekomendasi</h1>
          <p className="text-muted-foreground">Analisis mendalam masalah utama dan rekomendasi perbaikan</p>
        </div>

        {/* Summary Alert */}
        <Card className="p-6 rounded-3xl border-none shadow-soft bg-gradient-to-br from-destructive/10 to-transparent mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Perhatian Khusus Diperlukan</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Berdasarkan analisis 8.400 ulasan negatif, ditemukan 5 masalah kritis yang memerlukan penanganan segera. 
                Masalah login mendominasi dengan 38.6% dari total keluhan negatif.
              </p>
            </div>
          </div>
        </Card>

        {/* Top Issues */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Top 5 Masalah Terbanyak</h2>
          <div className="space-y-4">
            {topIssues.map((issue, index) => {
              const Icon = issue.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 rounded-3xl border-none shadow-soft bg-card hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-muted text-foreground border-none px-3 py-1 rounded-full">
                            #{index + 1}
                          </Badge>
                          <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {issue.count.toLocaleString()} keluhan
                          </span>
                          <div className="flex-1 max-w-md">
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
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
