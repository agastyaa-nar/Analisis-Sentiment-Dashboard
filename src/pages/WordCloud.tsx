import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const WordCloud = () => {
  const positiveWords = [
    { text: "bagus", size: "text-4xl" },
    { text: "mantap", size: "text-3xl" },
    { text: "bantu", size: "text-2xl" },
    { text: "mudah", size: "text-3xl" },
    { text: "praktis", size: "text-2xl" },
    { text: "cepat", size: "text-xl" },
    { text: "efisien", size: "text-2xl" },
  ];

  const neutralWords = [
    { text: "login", size: "text-3xl" },
    { text: "versi", size: "text-2xl" },
    { text: "update", size: "text-3xl" },
    { text: "aplikasi", size: "text-2xl" },
    { text: "data", size: "text-xl" },
    { text: "sistem", size: "text-2xl" },
  ];

  const negativeWords = [
    { text: "error", size: "text-5xl" },
    { text: "gagal", size: "text-4xl" },
    { text: "susah", size: "text-3xl" },
    { text: "tidak bisa login", size: "text-4xl" },
    { text: "lambat", size: "text-3xl" },
    { text: "crash", size: "text-2xl" },
    { text: "bug", size: "text-3xl" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Word Cloud Sentimen</h1>
          <p className="text-muted-foreground">Visualisasi kata-kata dominan dalam setiap kategori sentimen</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Positive Word Cloud */}
          <Card className="p-6 rounded-3xl border-none shadow-soft bg-card hover:shadow-glow transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-gradient-sage text-white border-none px-4 py-1 rounded-full">
                Positif
              </Badge>
              <span className="text-sm text-muted-foreground">2.840 ulasan</span>
            </div>
            <div className="min-h-[300px] flex flex-wrap items-center justify-center gap-4 p-6 bg-gradient-to-br from-sage-50 to-transparent rounded-2xl">
              {positiveWords.map((word, index) => (
                <span
                  key={index}
                  className={`${word.size} font-bold text-secondary hover:text-secondary-foreground transition-all duration-300 cursor-pointer hover:scale-110 animate-float`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {word.text}
                </span>
              ))}
            </div>
          </Card>

          {/* Neutral Word Cloud */}
          <Card className="p-6 rounded-3xl border-none shadow-soft bg-card hover:shadow-glow transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-muted-foreground text-white border-none px-4 py-1 rounded-full">
                Netral
              </Badge>
              <span className="text-sm text-muted-foreground">4.180 ulasan</span>
            </div>
            <div className="min-h-[300px] flex flex-wrap items-center justify-center gap-4 p-6 bg-gradient-to-br from-muted to-transparent rounded-2xl">
              {neutralWords.map((word, index) => (
                <span
                  key={index}
                  className={`${word.size} font-bold text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer hover:scale-110 animate-float`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {word.text}
                </span>
              ))}
            </div>
          </Card>

          {/* Negative Word Cloud */}
          <Card className="p-6 rounded-3xl border-none shadow-soft bg-card hover:shadow-glow transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-gradient-to-r from-destructive/80 to-destructive text-white border-none px-4 py-1 rounded-full">
                Negatif
              </Badge>
              <span className="text-sm text-muted-foreground">8.400 ulasan</span>
            </div>
            <div className="min-h-[300px] flex flex-wrap items-center justify-center gap-4 p-6 bg-gradient-to-br from-destructive/10 to-transparent rounded-2xl">
              {negativeWords.map((word, index) => (
                <span
                  key={index}
                  className={`${word.size} font-bold text-destructive hover:text-destructive/80 transition-all duration-300 cursor-pointer hover:scale-110 animate-float`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {word.text}
                </span>
              ))}
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
