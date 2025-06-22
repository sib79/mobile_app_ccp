import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'explore':
              iconName = 'compass-outline';
              break;
            case 'register':
              iconName = 'calendar-outline';
              break;
            case 'feedback':
              iconName = 'chatbubble-ellipses-outline';
              break;
            case 'social':
              iconName = 'people-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="explore" options={{ title: 'Explore', headerShown: false }} />
      <Tabs.Screen name="register" options={{ title: 'Register', headerShown: false }} />
      <Tabs.Screen name="feedback" options={{ title: 'Feedback', headerShown: false }} />
      <Tabs.Screen name="social" options={{ title: 'Social Feed', headerShown: false }} />
    </Tabs>
  );
}
