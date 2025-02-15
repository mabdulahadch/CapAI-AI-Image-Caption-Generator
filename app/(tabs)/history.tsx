import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';



const HISTORY_DATA = [
  {
    id: '1',
    imageUrl: require('../../assets/images/image1.jpg'), // ✅ Corrected path
    caption: 'A beautiful sunset over the mountains with vibrant orange and purple hues filling the sky.',
    date: '2025-01-20',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/image3.jpg'),
    caption: 'A serene lake reflecting the morning light.',
    date: '2025-01-29',
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/image2.jpg'),
    caption: 'A car in moon light.',
    date: '2025-02-13',
  },
  {
    id: '4',
    imageUrl: require('../../assets/images/image4.jpg'),
    caption: 'Sunset whispers secrets across the silent peaks.',
    date: '2025-02-14',
  },
  {
    id: '5',
    imageUrl: require('../../assets/images/image5.jpg'),
    caption: 'Natures hidden jewel.',
    date: '2025-02-15',
  },
];

export default function History() {

    let [fontsLoaded] = useFonts({
      Caveat_Regular: Outfit_400Regular,
      Caveat_Bold: Outfit_700Bold,
    });
  
    if (!fontsLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Loading Fonts...</Text>
        </View>
      );
    }




  const renderItem = ({ item }: { item: { id: string; imageUrl: any; caption: string; date: string } }) => (
    <View style={styles.historyItem}>
      <Image source={item.imageUrl} style={styles.thumbnail} />
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={HISTORY_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 10,
  },
  historyItem: {
    backgroundColor: 'rgba(218, 213, 235, 0.9)',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: '#392b6a'

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
   
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    fontFamily: 'Caveat_Bold',
  },
  captionContainer: {
    padding: 16,
  },
  caption: {
    color: '#392b6a',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8, 
    fontFamily: 'Caveat_Regular',
  },
  date: {
    color: '#392b6a',
    fontSize: 15,
    fontFamily: 'Caveat_Bold',
  },
});
