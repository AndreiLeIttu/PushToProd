import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="displayMedium" style={styles.title}>
          FinLearn
        </Text>
        <Text variant="headlineSmall" style={styles.subtitle}>
          Master Personal Finance Through Life Simulations
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Learn budgeting, saving, investing, and more through interactive scenarios that mirror real life.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Get Started
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6200ee',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

