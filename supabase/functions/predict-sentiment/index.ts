import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Teks tidak boleh kosong' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY tidak ditemukan');
      return new Response(
        JSON.stringify({ error: 'Konfigurasi server tidak valid' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Memproses prediksi sentimen untuk teks:', text.substring(0, 50) + '...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `Kamu adalah sistem analisis sentimen untuk ulasan aplikasi SIREKAP. 
Tugas kamu adalah mengklasifikasikan ulasan pengguna ke dalam 3 kategori: Positif, Netral, atau Negatif.

Kriteria:
- POSITIF: Ulasan yang menunjukkan kepuasan, pujian, atau pengalaman baik (kata seperti: bagus, mantap, membantu, mudah, lancar, sukses, terima kasih)
- NETRAL: Ulasan yang bersifat informatif, pertanyaan, atau tidak ada sentimen jelas (kata seperti: login, update, versi, aplikasi, data, sistem)
- NEGATIF: Ulasan yang menunjukkan keluhan, masalah, atau ketidakpuasan (kata seperti: error, gagal, susah, tidak bisa, lambat, crash, bug, buruk)

Berikan respons HANYA dalam format JSON berikut tanpa teks tambahan:
{
  "sentiment": "Positif" | "Netral" | "Negatif",
  "confidence": <angka 0-100>,
  "reason": "penjelasan singkat mengapa dikategorikan demikian",
  "keywords": ["kata1", "kata2", "kata3"]
}`
          },
          {
            role: 'user',
            content: `Analisis sentimen dari ulasan berikut: "${text}"`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(
          JSON.stringify({ error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        console.error('Payment required');
        return new Response(
          JSON.stringify({ error: 'Kredit AI habis. Silakan hubungi administrator.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Gagal memproses prediksi' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Response dari AI:', JSON.stringify(data));

    const aiResponse = data.choices[0].message.content;
    
    // Parse JSON response dari AI
    let result;
    try {
      // Coba ekstrak JSON dari response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        result = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback: coba deteksi sentimen dari keywords
      const lowerText = text.toLowerCase();
      let sentiment = 'Netral';
      let confidence = 60;
      
      const positiveWords = ['bagus', 'mantap', 'bantu', 'mudah', 'lancar', 'sukses', 'terima kasih', 'praktis', 'cepat'];
      const negativeWords = ['error', 'gagal', 'susah', 'tidak bisa', 'lambat', 'crash', 'bug', 'buruk', 'jelek'];
      
      const hasPositive = positiveWords.some(word => lowerText.includes(word));
      const hasNegative = negativeWords.some(word => lowerText.includes(word));
      
      if (hasNegative && !hasPositive) {
        sentiment = 'Negatif';
        confidence = 75;
      } else if (hasPositive && !hasNegative) {
        sentiment = 'Positif';
        confidence = 75;
      }
      
      result = {
        sentiment,
        confidence,
        reason: 'Analisis berdasarkan kata kunci dalam ulasan',
        keywords: []
      };
    }

    console.log('Hasil prediksi:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error dalam predict-sentiment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
