// components/ui/GameBackground.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';

export const GameBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg height="100%" width="100%">
        <Defs>
          {/* 1. GRADASI RADIAL (Biru Terang ke Biru Gelap) */}
          <RadialGradient
            id="grad"
            cx="50%"
            cy="20%"
            rx="80%"
            ry="80%"
            fx="50%"
            fy="20%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />  {/* Biru Tengah (Terang) */}
            <Stop offset="100%" stopColor="#1e3a8a" stopOpacity="1" /> {/* Biru Pinggir (Gelap) */}
          </RadialGradient>

          {/* 2. POLA DIAMOND (Texture) */}
          <Pattern
            id="pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            {/* Kotak Transparan kecil untuk efek tekstur */}
            <Rect x="0" y="0" width="20" height="20" fill="#000" fillOpacity="0.05" />
          </Pattern>
        </Defs>

        {/* Layer 1: Warna Dasar Gradasi */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />

        {/* Layer 2: Overlay Pola */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </Svg>
    </View>
  );
};