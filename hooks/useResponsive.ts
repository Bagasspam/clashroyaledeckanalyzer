// hooks/useResponsive.ts
import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width } = useWindowDimensions();
  
  // Batas Desktop vs Mobile (misal 768px)
  const isDesktop = width > 768;
  
  return {
    isDesktop,
    width,
    // Kamu bisa tambah variabel lain, misal: isTablet
  };
};