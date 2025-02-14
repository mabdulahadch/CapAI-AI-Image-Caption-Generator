import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#392b6a",
          borderTopColor: '#ffffff',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.4)",
        headerStyle: {
          backgroundColor: '#392b6a',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: '800',
          fontSize: 24,
        },
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