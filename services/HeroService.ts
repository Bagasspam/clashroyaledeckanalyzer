// src/services/HeroService.ts
import { ARCHETYPE_MAPPING, getDescriptionByArchetype } from "../constants/ArchetypeRules";
import { ArchetypeType } from "../constants/HeroData";

const API_URL = "https://royaleapi.github.io/cr-api-data/json/cards.json";

export interface HeroData {
  key: string;
  name: string;
  archetype: ArchetypeType;
  description: string;
}

// Data Manual (Tetap simpan buat jaga-jaga)
const MANUAL_HEROES: HeroData[] = [
  { key: 'hog-rider', name: 'Hog Rider', archetype: 'Cycle', description: 'Rotasi cepat.' },
  // ... dst
];

export const fetchHeroes = async (): Promise<HeroData[]> => {
  try {
    console.log("🔄 Fetching API...");
    const response = await fetch(API_URL);
    const rawData = await response.json();
    
    console.log("✅ API Response OK. Total kartu di API:", rawData.length);

    // --- PERUBAHAN DI SINI ---
    // Kita TIDAK LAGI memfilter kartu. Semua kartu diambil.
    
    const heroes: HeroData[] = rawData.map((card: any) => {
      
      // Cek apakah kartu ini punya Archetype khusus di mapping kita?
      // Jika TIDAK ADA, kita kasih label 'Support'
      const type: ArchetypeType = ARCHETYPE_MAPPING[card.key] || 'Support';

      return {
        key: card.key,
        name: card.name || card.key,
        archetype: type,
        description: getDescriptionByArchetype(type)
      };
    });

    console.log(`📊 Menampilkan SEMUA ${heroes.length} kartu.`);
    return heroes;

  } catch (error) {
    console.error("❌ Error Fetch:", error);
    return MANUAL_HEROES;
  }
};