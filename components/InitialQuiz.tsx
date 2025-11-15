import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import { PiggyBankIcon } from './icons/PiggyBankIcon';

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
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <PiggyBankIcon width={80} height={80} color="#10b981" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  formSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardSelected: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
    borderWidth: 3,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  optionLabelSelected: {
    color: '#10b981',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  optionDescriptionSelected: {
    color: '#059669',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#f87171',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
  },
  errorText: {
    color: '#991b1b',
    fontSize: 14,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InitialQuiz;

