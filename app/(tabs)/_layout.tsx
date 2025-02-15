import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { ActivityIndicator, View, Text } from 'react-native';

export default function TabLayout() {
  let [fontsLoaded] = useFonts({
    Caveat_Regular: Outfit_400Regular,
    Caveat_Bold: Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, fontFamily: 'Caveat_Regular', fontSize: 18 }}>
          Loading Fonts...
        </Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: 'rgba(57,43,106,1)',
          borderTopColor: '#ffffff',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: 'Caveat_Bold', // Apply custom font
          fontSize: 10,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        headerStyle: {
          backgroundColor: 'rgba(57,43,106,1)',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          fontFamily: 'Caveat_Bold', // Apply custom font
        },
        headerTitleAlign: 'center', // Center the header title
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Caption Generator',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="add-a-photo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}