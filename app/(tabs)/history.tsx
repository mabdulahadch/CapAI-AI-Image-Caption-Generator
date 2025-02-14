import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const HISTORY_DATA = [
  {
    id: '1',
    imageUrl: require('../../assets/images/image1.jpg'), // ✅ Corrected path
    caption: 'A beautiful sunset over the mountains with vibrant orange and purple hues filling the sky.',
    date: '2024-02-20',
  },
  {
    id: '2',
    imageUrl: require('../../assets/images/image3.jpg'),
    caption: 'A serene lake reflecting the morning light.',
    date: '2024-02-19',
  },
  {
    id: '3',
    imageUrl: require('../../assets/images/image2.jpg'),
    caption: 'A car in moon light.',
    date: '2024-02-21',
  },
];

export default function History() {
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
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  captionContainer: {
    padding: 16,
  },
  caption: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#64b5f6',
    fontSize: 14,
  },
});
