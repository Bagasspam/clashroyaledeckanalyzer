// components/ui/GoldBanner.tsx
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface GoldBannerProps extends ViewProps {
  title: string;
}

export const GoldBanner: React.FC<GoldBannerProps> = ({ title, style }) => {
  return (
    <View className="items-center justify-center py-2" style={style}>
      
      {/* 1. LAYER SVG (Background) */}
      <View className="absolute w-full h-full">
        <Svg height="100%" width="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
          <Defs>
            {/* Gradasi Emas: Dari Kuning Terang ke Oranye Emas */}
            <LinearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FFF7CC" />   {/* Highlight Atas */}
              <Stop offset="20%" stopColor="#FFD700" />  {/* Emas Murni */}
              <Stop offset="50%" stopColor="#FFC107" />  {/* Emas Sedang */}
              <Stop offset="100%" stopColor="#FF8F00" /> {/* Emas Gelap Bawah */}
            </LinearGradient>
            
            {/* Shadow/Border Gelap */}
            <LinearGradient id="borderGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#B45309" />
              <Stop offset="100%" stopColor="#78350F" />
            </LinearGradient>
          </Defs>

          {/* GAMBAR BENTUK SELENDANG (Path)
            M 0 0       -> Mulai Kiri Atas
            L 300 0     -> Garis ke Kanan Atas
            L 290 30    -> Turun ke Tengah Kanan (Indent Masuk)
            L 300 60    -> Ke Kanan Bawah
            L 0 60      -> Ke Kiri Bawah
            L 10 30     -> Naik ke Tengah Kiri (Indent Masuk)
            Z           -> Tutup Jalur
          */}
          
          {/* Layer Border (Sedikit lebih besar untuk efek outline) */}
          <Path 
            d="M0,0 L300,0 L290,30 L300,60 L0,60 L10,30 Z" 
            fill="url(#borderGrad)"
            stroke="#5c2b06"
            strokeWidth="2"
          />
    
          {/* Layer Utama (Emas) - Sedikit lebih kecil agar border terlihat */}
          <Path 
            d="M2,2 L298,2 L288,30 L298,58 L2,58 L12,30 Z" 
            fill="url(#goldGrad)" 
          />
          
        </Svg>
      </View>

      {/* 2. LAYER TEXT (Content) */}
      {/* Teks harus warna gelap agar kontras dengan emas, diberi shadow putih */}
      <View className="px-8 pb-1">
        <Text 
          className="text-2xl font-extrabold text-[#5c2b06] uppercase tracking-widest text-center"
          style={{ 
            textShadowColor: 'rgba(255, 255, 255, 0.6)', 
            textShadowOffset: { width: 0, height: 1 }, 
            textShadowRadius: 1 
          }}
        >
          {title}
        </Text>
      </View>

    </View>
  );
};