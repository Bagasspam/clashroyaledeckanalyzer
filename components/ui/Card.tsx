import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

// --- KONFIGURASI API GAMBAR ---
const ROYALE_API_VERSION = 'v8-7d088998'; 

interface CardProps {
  cardKey: string; // Contoh: "Mini_P.E.K.K.A.", "Dark_Prince"
}

export const Card = ({ cardKey }: CardProps) => {
  const [imgError, setImgError] = useState(false);

  // Fungsi internal untuk mengubah nama Dataset ke format URL API
  const getImageUrl = (originalName: string) => {
    // 1. Format: lowercase, hapus titik, ganti underscore jadi strip
    // Contoh: "Mini_P.E.K.K.A." -> "mini-pekka"
    let apiFormat = originalName
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/_/g, '-')
      .replace(/\s+/g, '-');
    
    // 2. Kamus Perbaikan Khusus RoyaleAPI
    const corrections: Record<string, string> = {
      'hero-knight': 'knight-hero',
      'boss-bandit': 'boss-bandit',
      'canon': 'cannon', // Di dataset 'Canon', di API 'cannon'
    };

    if (corrections[apiFormat]) {
      apiFormat = corrections[apiFormat];
    }

    return `https://cdns3.royaleapi.com/cdn-cgi/image/w=150,h=180,format=auto/static/img/cards/${ROYALE_API_VERSION}/${apiFormat}.png`;
  };

  // Bersihkan nama untuk label tampilan (Hapus underscore)
  const displayName = cardKey.replace(/_/g, ' ').replace('Evolution', 'Evo');

  // RENDER UI
  return (
    <View className="items-center m-1">
      {/* Bingkai Kartu */}
      <View className="w-[70px] h-[85px] bg-gray-800 rounded-lg overflow-hidden border border-white/20 relative shadow-lg">
        
        {imgError ? (
          // Tampilan jika gambar gagal dimuat
          <View className="flex-1 items-center justify-center bg-gray-700 p-1">
            <Ionicons name="alert-circle" size={20} color="#ef4444" />
            <Text className="text-[7px] text-gray-300 text-center mt-1 leading-tight">
               {displayName}
            </Text>
          </View>
        ) : (
          <Image
            source={{ uri: getImageUrl(cardKey) }}
            className="w-full h-full"
            resizeMode="contain"
            onError={() => {
                console.log(`❌ Gagal load gambar: ${cardKey}`);
                setImgError(true);
            }}
          />
        )}

        {/* Overlay Border Ungu jika Evolution */}
        {cardKey.includes('Evolution') && (
            <View className="absolute inset-0 border-2 border-purple-500/70 rounded-lg" />
        )}
        
        {/* Overlay Border Emas jika Champion (Sesuai nama dataset) */}
        {['Archer_Queen', 'Golden_Knight', 'Skeleton_King', 'Mighty_Miner', 'Monk', 'Little_Prince'].includes(cardKey) && (
            <View className="absolute inset-0 border-2 border-yellow-500/50 rounded-lg" />
        )}
      </View>

      {/* Label Nama di bawah kartu */}
      <Text 
        className={`text-[9px] font-bold mt-1 text-center max-w-[70px] ${cardKey.includes('Evolution') ? 'text-purple-300' : 'text-white'}`} 
        numberOfLines={1}
      >
        {displayName}
      </Text>
    </View>
  );
};