import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';
import SimulationScreen from '../screens/SimulationScreen';
import ConceptsScreen from '../screens/ConceptsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type MainTabParamList = {
  Dashboard: undefined;
  Simulation: undefined;
  Concepts: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
              break;
            case 'Simulation':
              iconName = focused ? 'account-circle' : 'account-circle-outline';
              break;
            case 'Concepts':
              iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Simulation" component={SimulationScreen} />
      <Tab.Screen name="Concepts" component={ConceptsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

