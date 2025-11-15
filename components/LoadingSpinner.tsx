import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Animated } from 'react-native';

const loadingMessages = [
  "Analyzing your financial profile...",
  "Preparing personalized life scenarios...",
  "Selecting your key life decision...",
  "Simulating possible financial outcomes...",
  "Tailoring challenge difficulty to your level...",
  "Generating realistic consequences...",
  "Setting up your financial journey...",
  "Calculating your balance...",
  "Loading smart decision paths...",
  "Finalizing your story..."
];

const LoadingSpinner: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [messageIndex, setMessageIndex] = useState(Math.floor(Math.random() * loadingMessages.length));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <ActivityIndicator size="large" color="#022E6B" />
      </Animated.View>

      <Animated.Text style={[styles.text, { opacity: pulseAnim }]}>
        {loadingMessages[messageIndex]}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
    backgroundColor: '#f9fafb',
    minHeight: 500,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LoadingSpinner;
