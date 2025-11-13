import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { ArrowRight, BarChart3, MessageSquare, TrendingUp, FileText, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Dashboard Sentimen",
      description: "Visualisasi real-time distribusi sentimen positif, netral, dan negatif dari ribuan ulasan pengguna.",
    },
    {
      icon: MessageSquare,
      title: "Word Cloud Interaktif",
      description: "Lihat kata-kata dominan dalam setiap kategori sentimen dengan visualisasi yang menarik.",
    },
    {
      icon: FileText,
      title: "Insights & Rekomendasi",
      description: "Temukan masalah utama dan dapatkan rekomendasi berbasis data untuk perbaikan aplikasi.",
    },
    {
      icon: Star,
      title: "Analisis Rating",
      description: "Pahami distribusi rating pengguna dan korelasi dengan sentimen ulasan.",
    },
  ];

  const stats = [
    { label: "Total Ulasan", value: "15.420", icon: Users },
    { label: "Akurasi Model", value: "92.3%", icon: BarChart3 },
    { label: "Kata Teranalisis", value: "150K+", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-6">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Analisis Sentimen SIREKAP</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Memahami Persepsi Publik Terhadap{" "}
            <span className="bg-gradient-warm bg-clip-text text-transparent">Aplikasi SIREKAP</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Platform analisis sentimen berbasis machine learning untuk mengidentifikasi masalah, 
            memahami feedback pengguna, dan memberikan rekomendasi perbaikan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-gradient-warm text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105 border-none">
                Lihat Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/insights">
              <Button 
                variant="outline" 
                className="rounded-2xl px-8 py-6 text-lg font-semibold border-2 border-border hover:bg-card transition-all duration-300"
              >
                Insights & Rekomendasi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="p-6 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-300 bg-card text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fitur Utama Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eksplorasi berbagai fitur analisis yang membantu memahami feedback pengguna secara mendalam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-8 rounded-3xl border-none shadow-soft hover:shadow-glow transition-all duration-300 bg-card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-12 rounded-3xl border-none shadow-glow bg-gradient-warm text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Mengeksplorasi Data?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Mulai analisis mendalam untuk memahami persepsi pengguna dan temukan area perbaikan yang paling krusial.
          </p>
          <Link to="/dashboard">
            <Button 
              className="bg-white text-primary rounded-2xl px-8 py-6 text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Mulai Analisis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 SIREKAP Analytics. Proyek Kerja Praktik - Komisi Pemilihan Umum</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
