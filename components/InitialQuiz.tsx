import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, ScrollView, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type LiteracyLevel = 'beginner' | 'medium' | 'advanced';

interface InitialQuizProps {
  onSubmit: (age: number, literacyLevel: LiteracyLevel) => void;
}

const InitialQuiz: React.FC<InitialQuizProps> = ({ onSubmit }) => {
  const [age, setAge] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<LiteracyLevel | null>(null);
  const [error, setError] = useState<string>('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    ]).start();
  }, []);

  const handleSubmit = () => {
    const ageNum = parseInt(age);
    
    if (!age || isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
      setError('Please enter a valid age between 13 and 100');
      return;
    }
    
    if (!selectedLevel) {
      setError('Please select your financial literacy level');
      return;
    }
    
    setError('');
    onSubmit(ageNum, selectedLevel);
  };

  const levelOptions: { value: LiteracyLevel; label: string; description: string }[] = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'I\'m just starting to learn about money and finances'
    },
    {
      value: 'medium',
      label: 'Intermediate',
      description: 'I know the basics and want to learn more'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'I have a good understanding of financial concepts'
    }
  ];

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Finly Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Let's Get Started!</Text>
          <Text style={styles.subtitle}>
            Help us personalize your financial journey
          </Text>

        <View style={styles.formSection}>
          <Text style={styles.label}>What's your age?</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={(text) => {
              setAge(text.replace(/[^0-9]/g, ''));
              setError('');
            }}
            placeholder="Enter your age"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>What's your financial literacy level?</Text>
          <View style={styles.optionsContainer}>
            {levelOptions.map((option) => {
              const isSelected = selectedLevel === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => {
                    setSelectedLevel(option.value);
                    setError('');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[
                    styles.optionDescription,
                    isSelected && styles.optionDescriptionSelected,
                  ]}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Animated.View
          style={{
            transform: [{ scale: buttonScale }],
          }}
        >
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: SCREEN_WIDTH < 375 ? 16 : 20,
    paddingTop: SCREEN_WIDTH < 375 ? 20 : 30,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH < 375 ? 12 : 16,
  },
  logoImage: {
    width: SCREEN_WIDTH < 375 ? 80 : 100,
    height: SCREEN_WIDTH < 375 ? 80 : 100,
  },
  title: {
    fontSize: SCREEN_WIDTH < 375 ? 22 : 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: SCREEN_WIDTH < 375 ? 8 : 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH < 375 ? 13 : 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: SCREEN_WIDTH < 375 ? 16 : 20,
    paddingHorizontal: SCREEN_WIDTH < 375 ? 12 : 0,
    lineHeight: SCREEN_WIDTH < 375 ? 18 : 20,
  },
  formSection: {
    width: '100%',
    maxWidth: SCREEN_WIDTH < 375 ? SCREEN_WIDTH - 32 : 400,
    marginBottom: SCREEN_WIDTH < 375 ? 16 : 20,
  },
  label: {
    fontSize: SCREEN_WIDTH < 375 ? 15 : 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: SCREEN_WIDTH < 375 ? 8 : 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: SCREEN_WIDTH < 375 ? 12 : 14,
    fontSize: SCREEN_WIDTH < 375 ? 16 : 18,
    color: '#111827',
    textAlign: 'center',
    minHeight: 44,
  },
  optionsContainer: {
    gap: SCREEN_WIDTH < 375 ? 8 : 10,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: SCREEN_WIDTH < 375 ? 12 : 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardSelected: {
    borderColor: '#022E6B',
    backgroundColor: '#e6f0ff',
    borderWidth: 3,
  },
  optionLabel: {
    fontSize: SCREEN_WIDTH < 375 ? 16 : 17,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  optionLabelSelected: {
    color: '#022E6B',
  },
  optionDescription: {
    fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
    color: '#6b7280',
    lineHeight: SCREEN_WIDTH < 375 ? 18 : 20,
  },
  optionDescriptionSelected: {
    color: '#022E6B',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#f87171',
    borderRadius: 8,
    padding: SCREEN_WIDTH < 375 ? 10 : 12,
    marginBottom: SCREEN_WIDTH < 375 ? 12 : 16,
    width: '100%',
    maxWidth: SCREEN_WIDTH < 375 ? SCREEN_WIDTH - 32 : 400,
  },
  errorText: {
    color: '#991b1b',
    fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#022E6B',
    paddingHorizontal: SCREEN_WIDTH < 375 ? 32 : 40,
    paddingVertical: SCREEN_WIDTH < 375 ? 12 : 14,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: SCREEN_WIDTH < 375 ? 4 : 8,
    marginBottom: SCREEN_WIDTH < 375 ? 16 : 20,
    minHeight: 44,
    width: '100%',
    maxWidth: SCREEN_WIDTH < 375 ? SCREEN_WIDTH - 32 : 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: SCREEN_WIDTH < 375 ? 18 : 20,
    fontWeight: 'bold',
  },
});

export default InitialQuiz;

