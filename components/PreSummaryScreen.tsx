import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const PreSummaryScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🎉 Game Complete!</Text>
      <Text style={styles.subtitle}>
        You've reached the end of your financial journey.
      </Text>
      <Text style={styles.message}>
        Preparing your personalized financial report…
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#022E6B",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#374151",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default PreSummaryScreen;
