import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const WordCloud = () => {
  const positiveWords = [
    { text: "bagus", size: "text-5xl", weight: 900 },
    { text: "mantap", size: "text-4xl", weight: 800 },
    { text: "bantu", size: "text-3xl", weight: 700 },
    { text: "mudah", size: "text-4xl", weight: 800 },
    { text: "praktis", size: "text-3xl", weight: 700 },
    { text: "cepat", size: "text-2xl", weight: 600 },
    { text: "efisien", size: "text-3xl", weight: 700 },
    { text: "memuaskan", size: "text-4xl", weight: 800 },
    { text: "responsif", size: "text-2xl", weight: 600 },
    { text: "terbaik", size: "text-3xl", weight: 700 },
    { text: "simpel", size: "text-xl", weight: 500 },
    { text: "lancar", size: "text-2xl", weight: 600 },
    { text: "oke", size: "text-xl", weight: 500 },
    { text: "recommended", size: "text-3xl", weight: 700 },
    { text: "user-friendly", size: "text-2xl", weight: 600 },
  ];

  const neutralWords = [
    { text: "login", size: "text-4xl", weight: 800 },
    { text: "versi", size: "text-3xl", weight: 700 },
    { text: "update", size: "text-4xl", weight: 800 },
    { text: "aplikasi", size: "text-3xl", weight: 700 },
    { text: "data", size: "text-2xl", weight: 600 },
    { text: "sistem", size: "text-3xl", weight: 700 },
    { text: "fitur", size: "text-2xl", weight: 600 },
    { text: "interface", size: "text-xl", weight: 500 },
    { text: "tampilan", size: "text-2xl", weight: 600 },
    { text: "notifikasi", size: "text-xl", weight: 500 },
    { text: "menu", size: "text-xl", weight: 500 },
    { text: "pengaturan", size: "text-2xl", weight: 600 },
  ];

  const negativeWords = [
    { text: "error", size: "text-6xl", weight: 900 },
    { text: "gagal", size: "text-5xl", weight: 900 },
    { text: "susah", size: "text-4xl", weight: 800 },
    { text: "tidak bisa login", size: "text-5xl", weight: 900 },
    { text: "lambat", size: "text-4xl", weight: 800 },
    { text: "crash", size: "text-3xl", weight: 700 },
    { text: "bug", size: "text-4xl", weight: 800 },
    { text: "lemot", size: "text-3xl", weight: 700 },
    { text: "ribet", size: "text-2xl", weight: 600 },
    { text: "force close", size: "text-3xl", weight: 700 },
    { text: "loading", size: "text-2xl", weight: 600 },
    { text: "boros baterai", size: "text-xl", weight: 500 },
    { text: "hang", size: "text-2xl", weight: 600 },
    { text: "jelek", size: "text-xl", weight: 500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Word Cloud Sentimen
          </h1>
          <p className="text-muted-foreground text-lg">Visualisasi kata-kata dominan dalam setiap kategori sentimen</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Positive Word Cloud */}
          <Card className="p-8 rounded-3xl border-none shadow-elegant bg-gradient-to-br from-card via-card to-sage-50/20 dark:to-sage-50/5 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sage-100/30 dark:bg-sage-100/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-sage animate-pulse" />
                  <Badge className="bg-gradient-sage text-white border-none px-5 py-2 rounded-full shadow-elegant text-sm font-bold">
                    Positif
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">2.840 ulasan</span>
              </div>
              <div className="min-h-[400px] flex flex-wrap items-center justify-center gap-4 p-10 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-sage-100/50 dark:border-sage-100/10 backdrop-blur-sm">
                {positiveWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} text-secondary hover:text-sage-700 dark:hover:text-sage-300 transition-all duration-300 cursor-pointer hover:scale-110 animate-fade-in drop-shadow-md`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      opacity: 0.7 + (word.weight / 3000)
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Neutral Word Cloud */}
          <Card className="p-8 rounded-3xl border-none shadow-elegant bg-gradient-to-br from-card via-card to-muted/30 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-muted/30 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground animate-pulse" />
                  <Badge className="bg-muted-foreground text-white border-none px-5 py-2 rounded-full shadow-elegant text-sm font-bold">
                    Netral
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">4.180 ulasan</span>
              </div>
              <div className="min-h-[400px] flex flex-wrap items-center justify-center gap-4 p-10 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-muted/50 backdrop-blur-sm">
                {neutralWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer hover:scale-110 animate-fade-in drop-shadow-md`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      opacity: 0.7 + (word.weight / 3000)
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Negative Word Cloud */}
          <Card className="p-8 rounded-3xl border-none shadow-elegant bg-gradient-to-br from-card via-card to-destructive/10 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-destructive/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-destructive to-destructive/70 animate-pulse" />
                  <Badge className="bg-gradient-to-r from-destructive/90 to-destructive text-white border-none px-5 py-2 rounded-full shadow-elegant text-sm font-bold">
                    Negatif
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-4 py-1.5 rounded-full">1.460 ulasan</span>
              </div>
              <div className="min-h-[400px] flex flex-wrap items-center justify-center gap-4 p-10 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-destructive/20 backdrop-blur-sm">
                {negativeWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} text-destructive hover:text-destructive/70 transition-all duration-300 cursor-pointer hover:scale-110 animate-fade-in drop-shadow-md`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      opacity: 0.7 + (word.weight / 3000)
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-6 rounded-3xl border-none shadow-soft bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tentang Word Cloud</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Word cloud menampilkan kata-kata yang paling sering muncul dalam ulasan. Ukuran teks menunjukkan frekuensi kemunculan kata tersebut. Kata-kata ini memberikan gambaran cepat tentang topik atau masalah utama yang dibahas pengguna dalam setiap kategori sentimen.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default WordCloud;
