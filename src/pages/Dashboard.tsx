import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { TrendingUp, TrendingDown, Minus, Star } from "lucide-react";

const Dashboard = () => {
  const sentimentData = {
    total: 15420,
    positive: 2840,
    neutral: 4180,
    negative: 8400,
  };

  const ratingData = [
    { stars: 5, count: 1240 },
    { stars: 4, count: 1600 },
    { stars: 3, count: 4180 },
    { stars: 2, count: 3600 },
    { stars: 1, count: 4800 },
  ];

  const positivePercent = ((sentimentData.positive / sentimentData.total) * 100).toFixed(1);
  const neutralPercent = ((sentimentData.neutral / sentimentData.total) * 100).toFixed(1);
  const negativePercent = ((sentimentData.negative / sentimentData.total) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dashboard Analisis Sentimen
          </h1>
          <p className="text-muted-foreground text-lg">Ringkasan persepsi publik terhadap aplikasi SIREKAP</p>
        </div>

        {/* Sentiment Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-7 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-500 bg-card hover:scale-105 animate-slide-up group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-warm opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Total Ulasan</span>
                <div className="w-12 h-12 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                {sentimentData.total.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Ulasan dianalisis</p>
            </div>
          </Card>

          <Card className="p-7 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-500 bg-card hover:scale-105 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Positif</span>
                <div className="w-12 h-12 rounded-2xl bg-gradient-sage flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-sage bg-clip-text text-transparent mb-2 tracking-tight">
                {positivePercent}%
              </div>
              <p className="text-sm text-muted-foreground">{sentimentData.positive.toLocaleString()} ulasan</p>
            </div>
          </Card>

          <Card className="p-7 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-500 bg-card hover:scale-105 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Netral</span>
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Minus className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <div className="text-4xl font-bold text-muted-foreground mb-2 tracking-tight">
                {neutralPercent}%
              </div>
              <p className="text-sm text-muted-foreground">{sentimentData.neutral.toLocaleString()} ulasan</p>
            </div>
          </Card>

          <Card className="p-7 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-500 bg-card hover:scale-105 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Negatif</span>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-destructive mb-2 tracking-tight">
                {negativePercent}%
              </div>
              <p className="text-sm text-muted-foreground">{sentimentData.negative.toLocaleString()} ulasan</p>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sentiment Distribution */}
          <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Distribusi Sentimen</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Positif</span>
                  <span className="text-sm font-bold text-foreground">{positivePercent}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-sage rounded-full transition-all duration-500"
                    style={{ width: `${positivePercent}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Netral</span>
                  <span className="text-sm font-bold text-foreground">{neutralPercent}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-muted-foreground/60 to-muted-foreground/80 rounded-full transition-all duration-500"
                    style={{ width: `${neutralPercent}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Negatif</span>
                  <span className="text-sm font-bold text-foreground">{negativePercent}%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-destructive/80 to-destructive rounded-full transition-all duration-500"
                    style={{ width: `${negativePercent}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Rating Distribution */}
          <Card className="p-6 rounded-3xl border-none shadow-soft bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Distribusi Rating</h3>
            <div className="space-y-4">
              {ratingData.map((rating) => {
                const percentage = ((rating.count / sentimentData.total) * 100).toFixed(1);
                return (
                  <div key={rating.stars}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{rating.stars}</span>
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{rating.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-warm rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-muted rounded-2xl">
              <p className="text-sm text-muted-foreground">
                💡 <span className="font-medium text-foreground">Insight:</span> Rating 1 bintang mendominasi dengan 4.800 ulasan, mengindikasikan permasalahan serius yang perlu ditangani.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
