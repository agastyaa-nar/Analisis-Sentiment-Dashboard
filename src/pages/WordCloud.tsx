import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

const WordCloud = () => {
  // Generate better distributed positions for words
  const getWordPositions = (wordCount: number) => {
    const positions = [];
    const cols = 8;
    const rows = Math.ceil(wordCount / cols);
    
    for (let i = 0; i < wordCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      positions.push({
        top: `${(row / rows) * 85 + Math.random() * 8 + 5}%`,
        left: `${(col / cols) * 85 + Math.random() * 8 + 5}%`,
        rotate: `${Math.random() * 30 - 15}deg`
      });
    }
    
    return positions;
  };

  const positiveWordsData = [
    { text: "bagus", size: "text-5xl", weight: 900, color: "hsl(142, 76%, 36%)" },
    { text: "mantap", size: "text-4xl", weight: 800, color: "hsl(142, 70%, 45%)" },
    { text: "bantu", size: "text-3xl", weight: 700, color: "hsl(142, 65%, 50%)" },
    { text: "mudah", size: "text-4xl", weight: 800, color: "hsl(142, 72%, 40%)" },
    { text: "praktis", size: "text-3xl", weight: 700, color: "hsl(142, 68%, 48%)" },
    { text: "cepat", size: "text-2xl", weight: 600, color: "hsl(142, 60%, 55%)" },
    { text: "efisien", size: "text-3xl", weight: 700, color: "hsl(142, 75%, 42%)" },
    { text: "memuaskan", size: "text-4xl", weight: 800, color: "hsl(142, 73%, 38%)" },
    { text: "responsif", size: "text-2xl", weight: 600, color: "hsl(142, 62%, 52%)" },
    { text: "terbaik", size: "text-3xl", weight: 700, color: "hsl(142, 71%, 44%)" },
    { text: "simpel", size: "text-xl", weight: 500, color: "hsl(142, 58%, 58%)" },
    { text: "lancar", size: "text-2xl", weight: 600, color: "hsl(142, 66%, 46%)" },
    { text: "oke", size: "text-xl", weight: 500, color: "hsl(142, 55%, 60%)" },
    { text: "recommended", size: "text-3xl", weight: 700, color: "hsl(142, 69%, 47%)" },
    { text: "user-friendly", size: "text-2xl", weight: 600, color: "hsl(142, 64%, 49%)" },
  ];
  const positivePositions = getWordPositions(positiveWordsData.length);
  const positiveWords = positiveWordsData.map((word, i) => ({ ...word, position: positivePositions[i] }));

  const neutralWordsData = [
    { text: "login", size: "text-4xl", weight: 800, color: "hsl(215, 16%, 47%)" },
    { text: "versi", size: "text-3xl", weight: 700, color: "hsl(215, 18%, 52%)" },
    { text: "update", size: "text-4xl", weight: 800, color: "hsl(215, 15%, 44%)" },
    { text: "aplikasi", size: "text-3xl", weight: 700, color: "hsl(215, 17%, 49%)" },
    { text: "data", size: "text-2xl", weight: 600, color: "hsl(215, 19%, 55%)" },
    { text: "sistem", size: "text-3xl", weight: 700, color: "hsl(215, 16%, 50%)" },
    { text: "fitur", size: "text-2xl", weight: 600, color: "hsl(215, 18%, 54%)" },
    { text: "interface", size: "text-xl", weight: 500, color: "hsl(215, 20%, 58%)" },
    { text: "tampilan", size: "text-2xl", weight: 600, color: "hsl(215, 17%, 53%)" },
    { text: "notifikasi", size: "text-xl", weight: 500, color: "hsl(215, 19%, 57%)" },
    { text: "menu", size: "text-xl", weight: 500, color: "hsl(215, 21%, 59%)" },
    { text: "pengaturan", size: "text-2xl", weight: 600, color: "hsl(215, 16%, 51%)" },
  ];
  const neutralPositions = getWordPositions(neutralWordsData.length);
  const neutralWords = neutralWordsData.map((word, i) => ({ ...word, position: neutralPositions[i] }));

  const negativeWordsData = [
    { text: "error", size: "text-6xl", weight: 900, color: "hsl(0, 84%, 60%)" },
    { text: "gagal", size: "text-5xl", weight: 900, color: "hsl(0, 80%, 55%)" },
    { text: "susah", size: "text-4xl", weight: 800, color: "hsl(0, 76%, 50%)" },
    { text: "tidak bisa login", size: "text-5xl", weight: 900, color: "hsl(0, 82%, 58%)" },
    { text: "lambat", size: "text-4xl", weight: 800, color: "hsl(0, 78%, 52%)" },
    { text: "crash", size: "text-3xl", weight: 700, color: "hsl(0, 72%, 48%)" },
    { text: "bug", size: "text-4xl", weight: 800, color: "hsl(0, 79%, 54%)" },
    { text: "lemot", size: "text-3xl", weight: 700, color: "hsl(0, 74%, 49%)" },
    { text: "ribet", size: "text-2xl", weight: 600, color: "hsl(0, 70%, 46%)" },
    { text: "force close", size: "text-3xl", weight: 700, color: "hsl(0, 75%, 50%)" },
    { text: "loading", size: "text-2xl", weight: 600, color: "hsl(0, 68%, 44%)" },
    { text: "boros baterai", size: "text-xl", weight: 500, color: "hsl(0, 65%, 42%)" },
    { text: "hang", size: "text-2xl", weight: 600, color: "hsl(0, 71%, 47%)" },
    { text: "jelek", size: "text-xl", weight: 500, color: "hsl(0, 66%, 43%)" },
  ];
  const negativePositions = getWordPositions(negativeWordsData.length);
  const negativeWords = negativeWordsData.map((word, i) => ({ ...word, position: negativePositions[i] }));

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

        <div className="space-y-8">
          {/* Positive Word Cloud */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-sage-50/20 dark:to-sage-50/5 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
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
              <div className="relative min-h-[600px] w-full p-12 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-sage-100/50 dark:border-sage-100/10 backdrop-blur-sm overflow-hidden">
                {positiveWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} absolute transition-all duration-300 cursor-pointer hover:scale-125 hover:z-50 animate-fade-in drop-shadow-lg whitespace-nowrap select-none`}
                    style={{ 
                      top: word.position.top,
                      left: word.position.left,
                      transform: `rotate(${word.position.rotate})`,
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      color: word.color,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Neutral Word Cloud */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-muted/30 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.1s" }}>
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
              <div className="relative min-h-[600px] w-full p-12 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-muted/50 backdrop-blur-sm overflow-hidden">
                {neutralWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} absolute transition-all duration-300 cursor-pointer hover:scale-125 hover:z-50 animate-fade-in drop-shadow-lg whitespace-nowrap select-none`}
                    style={{ 
                      top: word.position.top,
                      left: word.position.left,
                      transform: `rotate(${word.position.rotate})`,
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      color: word.color,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Negative Word Cloud */}
          <Card className="w-full p-8 rounded-3xl border-none shadow-soft bg-gradient-to-br from-card via-card to-destructive/10 hover:shadow-glow transition-all duration-500 animate-slide-up group overflow-hidden relative" style={{ animationDelay: "0.2s" }}>
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
              <div className="relative min-h-[600px] w-full p-12 bg-gradient-to-br from-background/50 to-transparent rounded-3xl border border-destructive/20 backdrop-blur-sm overflow-hidden">
                {negativeWords.map((word, index) => (
                  <span
                    key={index}
                    className={`${word.size} absolute transition-all duration-300 cursor-pointer hover:scale-125 hover:z-50 animate-fade-in drop-shadow-lg whitespace-nowrap select-none`}
                    style={{ 
                      top: word.position.top,
                      left: word.position.left,
                      transform: `rotate(${word.position.rotate})`,
                      animationDelay: `${index * 0.1}s`,
                      fontWeight: word.weight,
                      color: word.color,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
