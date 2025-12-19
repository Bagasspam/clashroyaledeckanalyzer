// src/components/HeroSelector.tsx
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { HEROES, getArchetypeColor } from '../../constants/HeroData';

// Helper URL Gambar
const getCardUrl = (key: string) => 
  `https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards/${key}.png`;

interface HeroSelectorProps {
  selectedHeroKey: string;
  onSelectHero: (heroKey: string) => void;
}

export const HeroSelector: React.FC<HeroSelectorProps> = ({ selectedHeroKey, onSelectHero }) => {
  
  // Cari data hero yang sedang dipilih
  const currentHero = HEROES.find(h => h.key === selectedHeroKey) || HEROES[0];

  return (
    <View className="bg-blue-500 rounded-2xl mt-4 border-2 border-b border-blue-400 overflow-hidden">
      
      {/* HEADER SECTION: Tampilan Hero Terpilih */}
      <View className="p-5 flex-row items-center">
        
        {/* Gambar Besar Hero */}
        <Image 
          source={{ uri: getCardUrl(currentHero.key) }}
          className="w-24 h-28 mr-5"
          resizeMode="contain"
        />

        {/* Info Archetype (Hasil K-Means) */}
        <View className="flex-1">
          <Text className="text-gray-200 text-xs uppercase mb-1">Selected Hero</Text>
          <Text className="text-white text-2xl font-extrabold mb-2">{currentHero.name}</Text>
          
          {/* BADGE ARCHETYPE */}
          <View className={`self-start px-3 py-1 rounded-full ${getArchetypeColor(currentHero.archetype)}`}>
            <Text className="text-white text-xs font-bold uppercase tracking-wider">
              {currentHero.archetype}
            </Text>
          </View>
          
          <Text className="text-gray-200 text-xs mt-2 italic">
            "{currentHero.description}"
          </Text>
        </View>
      </View>

      {/* LIST PILIHAN HERO (Horizontal Scroll) */}
      <View className="bg-blue-700 p-3">
        <Text className="text-gray-200 text-xs mb-2 ml-1">Pilih Kartu:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {HEROES.map((hero) => (
            <TouchableOpacity 
              key={hero.key}
              onPress={() => onSelectHero(hero.key)}
              className={`mr-3 p-1 rounded-lg border-2 ${
                selectedHeroKey === hero.key ? 'border-cr-gold bg-blue-300' : 'border-transparent'
              }`}
            >
              <Image 
                source={{ uri: getCardUrl(hero.key) }}
                className="w-12 h-14"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    </View>
  );
};