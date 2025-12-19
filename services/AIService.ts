// services/AIService.ts

// ⚠️ GANTI IP DI BAWAH INI SESUAI ALAMAT FLASK ANDA ⚠️
// Contoh: 'http://192.168.1.15:5000' atau 'http://10.223.253.241:5000'
const API_URL = 'https://bojji.pythonanywhere.com';

export interface SwapCandidate {
  name: string;
  similarity: number;
}

export interface PredictionResult {
  deck: string[];
  winRate: number;
  avgElixir: number;
  roles: Record<string, string[]>;
}

// 1. GENERATE DECK AWAL (Dari Kartu Hero)
export const generateRecommendation = async (heroName: string): Promise<PredictionResult | null> => {
  try {
    console.log(`📡 Connecting to AI: Generating deck for ${heroName} at ${API_URL}...`);
    
    // Kirim request POST ke Python
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hero: heroName }),
    });

    if (!response.ok) {
        console.error("❌ Server Error:", response.status);
        return null;
    }

    const data = await response.json();
    return data; // { deck, winRate, avgElixir, roles }
  } catch (error) {
    console.error("❌ Network Error (Generate):", error);
    alert("Gagal terhubung ke Server AI. Pastikan Laptop & HP di WiFi yang sama!");
    return null;
  }
};

// 2. CARI KARTU PENGGANTI (KNN)
export const getSwapCandidates = async (cardName: string): Promise<SwapCandidate[]> => {
  try {
    // cardName di sini harus "Mini_P.E.K.K.A." (format dataset)
    const response = await fetch(`${API_URL}/swap-candidates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card: cardName }),
    });

    const data = await response.json();
    return data.candidates || [];
  } catch (error) {
    console.error("❌ Error Fetch Swap:", error);
    return [];  
  }
};

// 3. PREDIKSI ULANG SETELAH GANTI KARTU (RF)
export const predictDeck = async (deck: string[]): Promise<PredictionResult | null> => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Network Error (Predict):", error);
    return null;
  }
};