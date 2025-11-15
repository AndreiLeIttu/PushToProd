import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SimulationProvider } from './src/contexts/SimulationContext';
import { ConceptProvider } from './src/contexts/ConceptContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SimulationProvider>
          <ConceptProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <RootNavigator />
            </NavigationContainer>
          </ConceptProvider>
        </SimulationProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

