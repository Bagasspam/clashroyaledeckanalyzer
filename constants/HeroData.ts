// src/constants/HeroData.ts

export type ArchetypeType = 'Beatdown' | 'Cycle' | 'Control' | 'Siege' | 'Bait' | 'Bridge Spam' | 'Support';

interface HeroInfo {
  key: string;      // ID API RoyaleAPI
  name: string;     // Nama Tampilan
  archetype: ArchetypeType;
  description: string; // Penjelasan singkat untuk UI
}

export const HEROES: HeroInfo[] = [
  { 
    key: 'hog-rider', 
    name: 'Hog Rider', 
    archetype: 'Cycle', 
    description: 'Serangan cepat dengan rotasi kartu murah.' 
  },
  { 
    key: 'golem', 
    name: 'Golem', 
    archetype: 'Beatdown', 
    description: 'Membangun serangan besar tak terhentikan.' 
  },
  { 
    key: 'pekka', // Perhatikan key API kadang beda (pekka / pekkas)
    name: 'P.E.K.K.A', 
    archetype: 'Control', 
    description: 'Bertahan lalu menyerang balik dengan kuat.' 
  },
  { 
    key: 'x-bow', 
    name: 'X-Bow', 
    archetype: 'Siege', 
    description: 'Menyerang tower musuh dari wilayah sendiri.' 
  },
  { 
    key: 'goblin-barrel', 
    name: 'Goblin Barrel', 
    archetype: 'Bait', 
    description: 'Memancing spell musuh keluar.' 
  },
  { 
    key: 'royal-ghost', 
    name: 'Royal Ghost', 
    archetype: 'Bait', 
    description: 'Menghilang tanpa Jejak.' 
  },
];

// Helper untuk warna badge berdasarkan archetype
export const getArchetypeColor = (type: ArchetypeType) => {
  switch (type) {
    case 'Beatdown': return 'bg-red-600';
    case 'Cycle': return 'bg-blue-500';
    case 'Control': return 'bg-purple-600';
    case 'Siege': return 'bg-orange-600';
    case 'Bait': return 'bg-orange-600';
    default: return 'bg-gray-600';
  }
};