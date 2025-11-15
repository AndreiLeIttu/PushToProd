import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { PiggyBankIcon } from './icons/PiggyBankIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface StartScreenProps {
  onStartSimulation: () => void;
  onStudyConcepts: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartSimulation, onStudyConcepts }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const button1Scale = useRef(new Animated.Value(1)).current;
  const button2Scale = useRef(new Animated.Value(1)).current;

  const handlePressIn1 = () => {
    Animated.spring(button1Scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut1 = () => {
    Animated.spring(button1Scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn2 = () => {
    Animated.spring(button2Scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut2 = () => {
    Animated.spring(button2Scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <PiggyBankIcon width={96} height={96} color="#ffffff" />
      </Animated.View>
      
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Welcome to FinQuest!</Text>
        <Text style={styles.description}>
          Navigate life's financial journey, make smart choices, and master the world of money in this interactive simulation.
        </Text>
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <Animated.View
          style={{
            transform: [{ scale: button1Scale }],
          }}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onStartSimulation}
            onPressIn={handlePressIn1}
            onPressOut={handlePressOut1}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Start Simulation</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{ scale: button2Scale }],
          }}
        >
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onStudyConcepts}
            onPressIn={handlePressIn2}
            onPressOut={handlePressOut2}
            activeOpacity={0.9}
          >
            <BookOpenIcon width={20} height={20} color="#10b981" />
            <Text style={styles.secondaryButtonText}>Study Concepts</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  iconContainer: {
    marginBottom: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 24,
    marginBottom: 8,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default StartScreen;
