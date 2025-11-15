import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';
import SimulationScreen from '../screens/SimulationScreen';
import SimulationFlowScreen from '../screens/SimulationFlowScreen';
import SimulationResultScreen from '../screens/SimulationResultScreen';
import ConceptsScreen from '../screens/ConceptsScreen';
import ConceptDetailScreen from '../screens/ConceptDetailScreen';
import ConceptQuizScreen from '../screens/ConceptQuizScreen';

export type MainTabParamList = {
  Dashboard: undefined;
  SimulationTab: undefined;
  ConceptsTab: undefined;
};

export type SimulationStackParamList = {
  Simulation: undefined;
  SimulationFlow: undefined;
  SimulationResult: undefined;
};

export type ConceptStackParamList = {
  Concepts: undefined;
  ConceptDetail: { concept: any };
  ConceptQuiz: { concept: any };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const SimulationStack = createNativeStackNavigator<SimulationStackParamList>();
const ConceptStack = createNativeStackNavigator<ConceptStackParamList>();

// Simulation Stack Navigator
function SimulationNavigator() {
  return (
    <SimulationStack.Navigator>
      <SimulationStack.Screen
        name="Simulation"
        component={SimulationScreen}
        options={{ title: 'Simulations' }}
      />
      <SimulationStack.Screen
        name="SimulationFlow"
        component={SimulationFlowScreen}
        options={{ title: 'Life Simulation' }}
      />
      <SimulationStack.Screen
        name="SimulationResult"
        component={SimulationResultScreen}
        options={{ title: 'Results', headerBackVisible: false }}
      />
    </SimulationStack.Navigator>
  );
}

// Concept Stack Navigator
function ConceptNavigator() {
  return (
    <ConceptStack.Navigator>
      <ConceptStack.Screen
        name="Concepts"
        component={ConceptsScreen}
        options={{ title: 'Financial Concepts' }}
      />
      <ConceptStack.Screen
        name="ConceptDetail"
        component={ConceptDetailScreen}
        options={{ title: 'Learn' }}
      />
      <ConceptStack.Screen
        name="ConceptQuiz"
        component={ConceptQuizScreen}
        options={{ title: 'Quiz' }}
      />
    </ConceptStack.Navigator>
  );
}

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
            case 'SimulationTab':
              iconName = focused ? 'account-circle' : 'account-circle-outline';
              break;
            case 'ConceptsTab':
              iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="SimulationTab"
        component={SimulationNavigator}
        options={{ title: 'Simulation' }}
      />
      <Tab.Screen
        name="ConceptsTab"
        component={ConceptNavigator}
        options={{ title: 'Concepts' }}
      />
    </Tab.Navigator>
  );
}

