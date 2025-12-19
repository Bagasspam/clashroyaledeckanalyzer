import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Pastikan path import ini benar sesuai folder Anda
import { Card } from '../../components/ui/Card';
import { GameBackground } from '../../components/ui/GameBackground';
import { generateRecommendation, getSwapCandidates, predictDeck, SwapCandidate } from '../../services/AIService';

export default function Dashboard() {
  const router = useRouter();
  const { hero } = useLocalSearchParams();
  const heroKey = Array.isArray(hero) ? hero[0] : hero; // Pastikan string

  // --- STATE (Penyimpanan Data Sementara) ---
  const [loading, setLoading] = useState(true); // Loading awal
  const [predicting, setPredicting] = useState(false); // Loading saat ganti kartu
  
  // Data Deck & Stats
  const [deck, setDeck] = useState<string[]>([]);
  const [stats, setStats] = useState<any>({
    winRate: 0,
    avgElixir: 0,
    roles: {} // Harus objek kosong, bukan null/undefined
  });
  // State untuk Fitur Swap (Modal)
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [swapCandidates, setSwapCandidates] = useState<SwapCandidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  // 1. SAAT HALAMAN DIBUKA: MINTA DECK KE SERVER
 useEffect(() => {
    console.log("🟢 Dashboard dibuka untuk Hero:", heroKey); // DEBUG 1

    if (!heroKey) return;

    const runAI = async () => {
      setLoading(true);
      console.log("🟡 Memanggil API generate..."); // DEBUG 2
      
      const result = await generateRecommendation(heroKey);
      
      console.log("🔵 Hasil dari API:", result); // DEBUG 3: Cek apakah null atau ada isinya?

      if (result) {
        setDeck(result.deck);
        setStats({ 
            winRate: result.winRate, 
            elixir: result.avgElixir, 
            roles: result.roles 
        });
      } else {
        console.error("🔴 Hasil API adalah NULL"); // DEBUG 4
      }
      setLoading(false);
    };

    runAI();
  }, [heroKey]);

  // 2. SAAT KARTU DIKLIK: BUKA MODAL KNN
  const handleCardPress = async (cardName: string) => {
    console.log("📤 Mengirim Deck ke Server untuk Filter:", deck); // TAMBAHKAN INI
        

    console.log("👆 Kartu diklik:", cardName); // DEBUG KLIK
    console.log("Hero Utama:", heroKey);
    // Larang ganti kartu Hero utama
    if (cardName.toLowerCase() === heroKey?.toLowerCase()) {
        alert("Kartu Hero utama tidak bisa diganti!");
        return;
    }

    setSelectedCard(cardName);
    setModalVisible(true);
    setLoadingCandidates(true);
    
    // Minta kandidat ke Server
    const candidates = await getSwapCandidates(cardName);

    console.log("📥 Kandidat yang diterima:", candidates); // TAMBAHKAN INI

    setSwapCandidates(candidates);
    setLoadingCandidates(false);
  };

  

  // 3. SAAT PILIH KARTU BARU: UPDATE & PREDIKSI ULANG
  const handleSwapConfirm = async (newCard: string) => {
    setModalVisible(false); // Tutup modal
    setPredicting(true);    // Tampilkan loading kecil

    // Ganti kartu di array lokal
    const newDeck = deck.map(c => c === selectedCard ? newCard : c);
    setDeck(newDeck);

    // Minta Server hitung ulang Win Rate
    const result = await predictDeck(newDeck);
    if (result) {
        setStats({
            winRate: result.winRate,
            elixir: result.avgElixir,
            roles: result.roles
        });
    }
    setPredicting(false);
  };

  // TAMPILAN LOADING AWAL
  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <GameBackground />
        <ActivityIndicator size="large" color="#ffd700" />
        <Text className="text-white mt-4 font-bold text-lg tracking-widest">
          AI IS THINKING...
        </Text>
        <Text className="text-gray-400 text-xs mt-1">
          Generating Strategy via Random Forest
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0f172a]">
      <GameBackground />
      
      <ScrollView contentContainerClassName="pb-20">
        
        {/* HEADER */}
        <View className="flex-row items-center p-6 pt-12 mb-2 bg-black/20 border-b border-white/10">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text className="text-gray-400 text-xs font-bold uppercase">AI Deck Builder</Text>
            <Text className="text-white font-extrabold text-xl capitalize">{heroKey?.replace(/-/g, ' ')}</Text>
          </View>
        </View>

        <View className="px-4 gap-4">
          
          {/* PANEL STATISTIK (WIN RATE) */}
          <View className="bg-blue-600 rounded-2xl p-5 border-2 border-blue-400 shadow-xl">
            {predicting ? (
                <View className="py-4 items-center">
                    <ActivityIndicator color="white" />
                    <Text className="text-white text-xs mt-2">Recalculating...</Text>
                </View>
            ) : (
                <>
                <Text className="text-white text-center font-bold border-b border-blue-400 pb-2 mb-4">
                  PREDICTED PERFORMANCE
                </Text>
                <View className="flex-row justify-around items-center">
                    <View className="items-center">
                        <Text className="text-5xl font-black text-white">{stats.winRate}%</Text>
                        <View className="bg-green-500 px-2 py-0.5 rounded mt-1">
                          <Text className="text-[10px] font-bold text-white uppercase">Win Rate</Text>
                        </View>
                    </View>
                    <View className="w-[1px] h-12 bg-blue-300 opacity-50" />
                    <View className="items-center">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-4xl font-bold text-purple-200">{stats.elixir}</Text>
                          <FontAwesome name="tint" size={24} color="#d946ef" />
                        </View>
                        <Text className="text-blue-200 text-[10px] font-bold uppercase mt-1">Avg Elixir</Text>
                    </View>
                </View>
                </>
            )}
          </View>

          {/* DECK GRID (INTERAKTIF) */}
          <View className="bg-black/40 border border-white/20 rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-4 ml-1">
                <Text className="text-white text-sm font-bold opacity-80">
                    TAP CARD TO SWAP 🔄
                </Text>
            </View>

            <View className="flex-row flex-wrap justify-center mt-4">
              {deck.map((card, index) => (
                <TouchableOpacity
                  key={`${card}-${index}`}
                  onPress={() => handleCardPress(card)}
                  // UBAH DISINI: w-[23%] untuk grid 4 kolom yang konsisten
                  className="w-[23%] p-1 mb-2 items-center"
                >
                  <Card cardKey={card} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ROLE BREAKDOWN (INFO STRATEGI) */}
          <View className="mt-2">
            <Text className="text-white font-bold mb-3 text-lg ml-2">Deck Composition</Text>
            
            {stats?.roles && Object.entries(stats.roles).length > 0 ? (
              Object.entries(stats.roles).map(([role, cards]: any) => (
                <View key={role} className="mb-3 bg-white/5 p-3 rounded-xl border-l-4 border-yellow-500 ml-2 mr-2">
                    <Text className="text-yellow-500 text-xs font-black uppercase mb-1">{role}</Text>
                    <Text className="text-gray-300 text-sm font-medium">
                      {Array.isArray(cards) ? cards.join(', ') : cards}
                    </Text>
                </View>
              ))
            ) : (
              <ActivityIndicator color="#ffd700" style={{ marginTop: 10 }} />
            )}
          </View>

        </View>
      </ScrollView>

      {/* --- MODAL SWAP (KNN UI) --- */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/60">
           <View className="bg-gray-900 border-t border-white/20 rounded-t-3xl p-6 h-[55%] shadow-2xl">
              
              {/* Header Modal */}
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-white/10">
                <View>
                    <Text className="text-gray-400 text-xs uppercase font-bold">Swap Card</Text>
                    <Text className="text-white text-xl font-bold">Ganti {selectedCard}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-white/10 p-2 rounded-full">
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Konten Modal */}
              {loadingCandidates ? (
                  <View className="flex-1 items-center justify-center">
                      <ActivityIndicator size="large" color="#ffd700" />
                      <Text className="text-gray-400 mt-4 font-bold">Mencari kartu yang mirip...</Text>
                  </View>
              ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {swapCandidates.length === 0 ? (
                        <View className="items-center py-10">
                            <Ionicons name="alert-circle-outline" size={48} color="gray" />
                            <Text className="text-gray-400 text-center mt-4">
                                Tidak ditemukan kartu pengganti yang cocok.
                            </Text>
                        </View>
                    ) : (
                        swapCandidates.map((cand, idx) => (
                        <TouchableOpacity 
                            key={idx} 
                            className="flex-row justify-between items-center bg-white/5 p-4 rounded-xl mb-3 border border-white/5 active:bg-white/10"
                            onPress={() => handleSwapConfirm(cand.name)}
                        >
                            <View className="flex-row items-center gap-4">
                                {/* Nomor Urut */}
                                <View className="bg-white/10 w-8 h-8 rounded-full items-center justify-center">
                                    <Text className="text-white font-bold">{idx + 1}</Text>
                                </View>
                                <Text className="text-white font-bold text-lg">{cand.name}</Text>
                            </View>
                            
                            {/* Similarity Badge */}
                            <View className="bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-500/30">
                                <Text className="text-green-400 text-xs font-bold">
                                    {cand.similarity}% Match
                                </Text>
                            </View>
                        </TouchableOpacity>
                        ))
                    )}
                  </ScrollView>
              )}
           </View>
        </View>
      </Modal>

    </View>
  );
}