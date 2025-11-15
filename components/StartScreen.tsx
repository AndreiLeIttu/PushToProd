import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PiggyBankIcon } from './icons/PiggyBankIcon';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <PiggyBankIcon width={96} height={96} color="#ffffff" />
      <Text style={styles.title}>Welcome to FinQuest!</Text>
      <Text style={styles.description}>
        Navigate life's financial journey, make smart choices, and master the world of money in this interactive simulation.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Start Your Life</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#10b981',
    minHeight: 500,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 400,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StartScreen;
