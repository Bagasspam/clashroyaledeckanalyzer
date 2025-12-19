// src/constants/ArchetypeRules.ts
import { ArchetypeType } from "./HeroData";

// Pastikan KEY di sebelah kiri sama persis dengan KEY dari API (biasanya lowercase & dash)
export const ARCHETYPE_MAPPING: Record<string, ArchetypeType> = {
    'archer-queen': 'Control',
  'golden-knight': 'Bridge Spam',
  'skeleton-king': 'Bait',
  'mighty-miner': 'Cycle',
  'monk': 'Control',
  'little-prince': 'Control',

  // --- Cycle ---
  'hog-rider': 'Cycle',
  'miner': 'Cycle',
  'wall-breakers': 'Cycle',
  'skeleton-barrel': 'Cycle',
  'mighty-miner': 'Cycle',
  'drill': 'Cycle', // Goblin Drill biasanya kuncinya 'drill' atau 'goblin-drill'

  // --- Beatdown ---
  'golem': 'Beatdown',
  'giant': 'Beatdown',
  'lava-hound': 'Beatdown',
  'electro-giant': 'Beatdown',
  'royal-giant': 'Beatdown',
  'goblin-giant': 'Beatdown',
  'elixir-golem': 'Beatdown',

  // --- Control ---
  'pekka': 'Control', // Cek console log, kadang 'pekkas' (tapi biasanya pekka)
  'mega-knight': 'Control',
  'graveyard': 'Control',
  'sparky': 'Control',
  'giant-skeleton': 'Control',
  'balloon': 'Control',

  // --- Siege ---
  'x-bow': 'Siege',
  'mortar': 'Siege',

  // --- Bait ---
  'goblin-barrel': 'Bait',
  'princess': 'Bait',
  'skeleton-king': 'Bait',
  'three-musketeers': 'Bait',

  // --- Bridge Spam ---
  'battle-ram': 'Bridge Spam',
  'ram-rider': 'Bridge Spam',
  'royal-ghost': 'Bridge Spam',
  'bandit': 'Bridge Spam', // INI YANG KAMU CARI TADI
  'elite-barbarians': 'Bridge Spam',
  'dark-prince': 'Bridge Spam',
  'prince': 'Bridge Spam'
};

export const getDescriptionByArchetype = (type: ArchetypeType) => {
  switch (type) {
    case 'Cycle': return 'Rotasi kartu cepat & murah.';
    case 'Beatdown': return 'Membangun serangan besar (Big Push).';
    case 'Control': return 'Bertahan solid lalu serangan balik.';
    case 'Siege': return 'Menyerang tower dari wilayah sendiri.';
    case 'Bait': return 'Memancing musuh membuang Spell.';
    case 'Bridge Spam': return 'Tekanan konstan di jembatan.';
    
    // TAMBAHKAN INI:
    case 'Support': return 'Kartu pendukung / Spell.';
    
    default: return 'Kartu Clash Royale.';
  }
};