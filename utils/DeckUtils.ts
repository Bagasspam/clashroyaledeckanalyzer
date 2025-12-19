// src/utils/DeckUtils.ts
import { Alert, Linking } from 'react-native';
import { CARD_ID_MAPPING } from '../constants/CardIds';

export const copyDeckToGame = async (deckKeys: string[]) => {
  try {
    // 1. Konversi Array String ['hog', 'zap'] menjadi Array ID [26000021, 28000008]
    const deckIds = deckKeys.map(key => {
      const id = CARD_ID_MAPPING[key];
      if (!id) {
        console.warn(`ID not found for card: ${key}`);
        return null; 
      }
      return id;
    }).filter(id => id !== null); // Buang yang null

    // 2. Validasi (Harus 8 kartu)
    if (deckIds.length !== 8) {
      Alert.alert("Gagal", "Deck tidak lengkap atau ada kartu yang ID-nya belum terdaftar.");
      return;
    }

    // 3. Buat URL Deep Link
    // Format: clashroyale://copyDeck?deck=ID;ID;ID...
    const url = `clashroyale://copyDeck?deck=${deckIds.join(';')}`;

    // 4. Buka Game
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      // Jika dibuka di Simulator atau HP yang ga ada gamenya
      Alert.alert("Error", "Clash Royale tidak terinstall di perangkat ini.");
      // Alternatif: Copy link ke clipboard biasa
      // Clipboard.setString(url);
    }

  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Gagal membuka Clash Royale.");
  }
};