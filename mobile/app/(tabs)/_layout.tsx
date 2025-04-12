import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerRight: () => (
          <Image
            source={require('@/assets/images/clinic-icon.png')}
            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 16 }}
          />
        ),
        headerStyle: {
          backgroundColor: "#f8f9fa",
        },
        headerTitleStyle: {
          color: "black",
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Strona główna',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Lekarze',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="doctor" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="patients"
        options={{
          title: 'Pacjenci',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="human-cane" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          href: null
        }}
      />

      <Tabs.Screen
        name="event"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
