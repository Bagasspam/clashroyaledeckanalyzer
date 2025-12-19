// app/index.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';
import { GameBackground } from '../../components/ui/GameBackground'; // <--- IMPORT INI
import { GoldBanner } from '../../components/ui/GoldBanner';
import { HeroSelector } from '../../components/ui/HeroSelector';
import { useResponsive } from '../../hooks/useResponsive';

const MOCK_DECK = [
  'hog-rider', 'musketeer', 'cannon', 'skeletons',
  'ice-spirit', 'the-log', 'fireball', 'ice-golem'
];

export default function Home() {
  const [selectedHero, setSelectedHero] = useState('hog-rider');
  const { isDesktop } = useResponsive();
  const avgElixir = 2.6; 

  return (
    // HAPUS className="bg-blue-900" di sini, ganti jadi flex-1 relative
    <View className="flex-1 relative bg-black">
      
      {/* 1. BACKGROUND SVG (Ditaruh paling atas agar di layer belakang) */}
      <GameBackground />

      <View className=" px-4 bg-black/20 py-5">
          <GoldBanner title="Clash Royale AI" />
        </View>

      {/* 2. KONTEN SCROLLABLE (Ditaruh di atas background) */}
      <ScrollView className="flex-1" contentContainerClassName="pb-10">

        

        {/* === MAIN CONTENT === */}
        <View className={`gap-4 mx-4 ${isDesktop ? 'p-5 flex-row' : 'p-1 flex-col'}`}>
          
          <HeroSelector
            selectedHeroKey={selectedHero}
            onSelectHero={(key) => setSelectedHero(key)}
          />
          
          {/* KOLOM KIRI */}
          {/* Ganti bg-blue-600 jadi warna semi-transparan (backdrop) agar lebih modern */}
          <View className={`bg-black/30 backdrop-blur-md rounded-2xl p-5 my-2 border border-white/20 shadow-xl ${isDesktop ? 'w-[30%]' : 'w-full'}`}>
            <Text className="text-white text-lg font-bold mb-4 border-b border-white/20 pb-2 text-center">
              Analisis Statistik
            </Text>
            
            <View className="items-center mb-6 py-4">
              <Text className="text-5xl font-black text-white drop-shadow-md">52.4%</Text>
              <View className="bg-green-500 px-3 py-1 rounded-full mt-2 shadow-sm">
                <Text className="text-white text-[10px] uppercase font-bold tracking-wider">
                  Prediksi Menang
                </Text>
              </View>
            </View>

            <TouchableOpacity className="bg-orange-500 py-3 rounded-xl items-center active:bg-orange-600 border-b-4 border-orange-700 active:border-b-0 active:mt-1 shadow-lg">
              <Text className="text-white font-bold text-base uppercase tracking-wide">
                Optimalkan Deck
              </Text>
            </TouchableOpacity>
          </View>

          {/* KOLOM KANAN */}
          <View className={`bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl ${isDesktop ? 'w-[68%] p-5' : 'w-full p-3'}`}>
            
            <View className="flex-row justify-between items-center mb-3 border-b border-white/20 pb-2">
              <Text className="text-white text-lg font-bold">
                Rekomendasi Deck
              </Text>

              <View className="flex-row items-center bg-black/40 px-3 py-1 rounded-lg border border-white/10">
                <Text className="text-blue-200 text-[10px] font-bold mr-2 uppercase">Avg Elixir</Text>
                <Text className="text-xl font-black text-white mr-1">{avgElixir}</Text>
                <FontAwesome name="tint" size={16} color="#d946ef" /> 
              </View>
            </View>
            
            <View className="flex-row flex-wrap justify-between">
              {MOCK_DECK.map((card, index) => (
                <Card key={`${card}-${index}`} cardKey={card} />
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}