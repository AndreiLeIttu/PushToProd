import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { PiggyBankIcon } from './icons/PiggyBankIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { WalletIcon } from './icons/WalletIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { UserIcon } from './icons/UserIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.welcomeSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Welcome to Finly!</Text>
          <Text style={styles.introduction}>
            Make real money decisions and see how they shape your future! Navigate life from your teens to retirement and learn financial skills that actually matter.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.featureCard}>
            <WalletIcon width={28} height={28} color="#ffffff" />
            <Text style={styles.featureText}>Make money choices at every life stage</Text>
          </View>
          <View style={styles.featureCard}>
            <TrophyIcon width={28} height={28} color="#ffffff" />
            <Text style={styles.featureText}>Watch your net worth change with each decision</Text>
          </View>
          <View style={styles.featureCard}>
            <BookOpenIcon width={28} height={28} color="#ffffff" />
            <Text style={styles.featureText}>Learn through real scenarios, not boring lectures</Text>
          </View>
          <View style={styles.featureCard}>
            <UserIcon width={28} height={28} color="#ffffff" />
            <Text style={styles.featureText}>Get feedback tailored just for you</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.readyText}>Ready to start your financial journey?</Text>
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
            <Text style={styles.secondaryButtonText}>Study Concepts</Text>
          </TouchableOpacity>
        </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022E6B',
  },
  scrollContent: {
    flexGrow: 1,
    padding: SCREEN_WIDTH < 375 ? 20 : 32,
    paddingTop: SCREEN_WIDTH < 375 ? 40 : 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH < 375 ? 24 : 32,
    width: '100%',
  },
  title: {
    fontSize: SCREEN_WIDTH < 375 ? 28 : 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: SCREEN_WIDTH < 375 ? 12 : 16,
    textAlign: 'center',
  },
  introduction: {
    fontSize: SCREEN_WIDTH < 375 ? 15 : 18,
    color: '#ffffff',
    textAlign: 'center',
    maxWidth: SCREEN_WIDTH < 375 ? SCREEN_WIDTH - 40 : 400,
    lineHeight: SCREEN_WIDTH < 375 ? 22 : 24,
    opacity: 0.95,
  },
  featuresContainer: {
    width: '100%',
    maxWidth: SCREEN_WIDTH < 375 ? SCREEN_WIDTH - 40 : 400,
    gap: SCREEN_WIDTH < 375 ? 12 : 16,
    marginBottom: SCREEN_WIDTH < 375 ? 24 : 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: SCREEN_WIDTH < 375 ? 14 : 16,
    borderRadius: 12,
    gap: 12,
  },
  featureText: {
    flex: 1,
    fontSize: SCREEN_WIDTH < 375 ? 14 : 16,
    color: '#ffffff',
    lineHeight: SCREEN_WIDTH < 375 ? 20 : 22,
  },
  readyText: {
    fontSize: SCREEN_WIDTH < 375 ? 17 : 20,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SCREEN_WIDTH < 375 ? 20 : 24,
    paddingHorizontal: SCREEN_WIDTH < 375 ? 16 : 0,
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
    color: '#022E6B',
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
