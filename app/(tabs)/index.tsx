// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Import Komponen Custom
import { Card } from '../../components/ui/Card';
import { GameBackground } from '../../components/ui/GameBackground';
import { GoldBanner } from '../../components/ui/GoldBanner';
import { useResponsive } from '../../hooks/useResponsive';
import { fetchHeroes, HeroData } from '../../services/HeroService';

// Import Daftar 104 Kartu Valid
import { DATASET_CARDS } from '../../constants/CardLists';

// KATEGORI TAB (K-Means Clusters)
const CATEGORIES = ['All', 'Cycle', 'Beatdown', 'Control', 'Siege', 'Bait'];

export default function Home() {
  const router = useRouter();
  const { isDesktop } = useResponsive();
  
  // STATE DATA
  const [heroes, setHeroes] = useState<HeroData[]>([]);
  const [loading, setLoading] = useState(true);

  // STATE FILTER
  const [activeTab, setActiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');

  // 1. FETCH DATA SAAT APLIKASI DIBUKA
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const allHeroes = await fetchHeroes(); // Mengambil 120 kartu dari API
      
      console.log("🔄 Fetching API...");
      console.log("✅ API Response OK. Total kartu di API:", allHeroes.length);

      // --- LOGIKA FILTER 104 KARTU ---
      const validHeroes = allHeroes.filter(hero => {
        // Normalisasi nama API (misal: "mini-pekka")
        const normalizedApiKey = hero.key.toLowerCase().replace(/\./g, '').replace(/_/g, '-');
        
        // Cek apakah ada di DATASET_CARDS (kita bersihkan juga saat membandingkan)
        return DATASET_CARDS.some(datasetName => {
          const normalizedDatasetName = datasetName.toLowerCase().replace(/\./g, '').replace(/_/g, '-');
          return normalizedApiKey === normalizedDatasetName;
        });
      }); 

      setHeroes(validHeroes);
      console.log(`📊 Filter Berhasil: Menampilkan ${validHeroes.length} kartu dari dataset.`);
      setLoading(false);
    };
    loadData();
  }, []);

  // LOGIC FILTERING (Search & Tabs)
  const filteredHeroes = heroes.filter(hero => {
    const matchesTab = activeTab === 'All' || hero.archetype === activeTab;
    const matchesSearch = hero.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <View className="flex-1 relative bg-[#0f172a]">
      
      {/* 1. BACKGROUND SVG */}
      <GameBackground />

      <ScrollView className="flex-1" contentContainerClassName="pb-10">
        
        {/* === HEADER === */}
        <View className="pt-12 pb-6 px-4 items-center">
          <GoldBanner title="Clash Royale AI" />
          <Text className="text-gray-300 text-xs mt-2 italic font-bold">
            Powered by K-Means • KNN • Random Forest
          </Text>
        </View>

        {/* === SECTION 1: SEARCH BAR === */}
        <View className={`mx-6 mb-4 flex-row items-center bg-black/40 border border-white/20 rounded-full px-4 py-3 ${isDesktop ? 'w-1/2 self-center' : ''}`}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput 
            className="flex-1 ml-3 text-white font-bold"
            placeholder="Cari Hero (misal: P.E.K.K.A)..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* === SECTION 2: K-MEANS FILTER TABS === */}
        <View className="mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            
          </ScrollView>
        </View>

        {/* === SECTION 3: HERO GRID (MAIN CONTENT) === */}
        <View className={`mx-4 ${isDesktop ? 'px-20' : ''}`}>
          <Text className="text-white font-bold text-lg mb-4 ml-2 border-l-4 border-yellow-500 pl-3">
            Pilih Kartu Utama
          </Text>

          {loading ? (
            <View className="mt-10 items-center">
              <ActivityIndicator size="large" color="#ffd700" />
              <Text className="text-white mt-2 font-bold">Mengambil Data Kartu...</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between px-2">
              {filteredHeroes.map((hero) => (
                <TouchableOpacity 
                  key={hero.key}
                  onPress={() => router.push({
                        pathname: "/dashboard",
                        params: { hero: hero.key }
                      })}
                  className="w-[23%] mb-4 items-center" 
                >
                  <Card cardKey={hero.key} />
                  
                  {/* HAPUS ATAU KOMENTARI BAGIAN DI BAWAH INI:
                      <View className="absolute top-0 right-0 bg-black/80 px-1 py-0.5 rounded border border-white/10">
                        <Text className="text-[5px] text-yellow-400 font-bold uppercase">
                            {hero.archetype}
                        </Text>
                      </View> 
                  */}
                  
                </TouchableOpacity>
              ))}
            </View>
          )}

        </View>

      </ScrollView>
    </View>
  );
}