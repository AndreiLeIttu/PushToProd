import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal 
} from 'react-native';
import { Scenario, PlayerStats } from '../types';
import { UserIcon } from './icons/UserIcon';
import { WalletIcon } from './icons/WalletIcon';

interface GameScreenProps {
  scenario: Scenario;
  playerStats: PlayerStats;
  onAnswerSubmit: (answer: string) => void;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}

const GameScreen: React.FC<GameScreenProps> = ({ scenario, playerStats, onAnswerSubmit, streak, setStreak }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showHint, setShowHint] = useState(false);
  const hintOpacity = useRef(new Animated.Value(0)).current;

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackQuality, setFeedbackQuality] = useState<"good" | "neutral" | "bad">("neutral");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    setShowHint(false);
    hintOpacity.setValue(0);

    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scenario]);

  const revealHint = () => {
    setShowHint(true);
    Animated.timing(hintOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const opt = scenario.options.find(o => o.text === selectedOption);
    if (!opt) return;

    let quality: "good" | "neutral" | "bad" = "neutral";
    if (opt.moneyDelta !== undefined && opt.moneyDelta > 0) {
      quality = "good";
      setStreak(prev => prev + 1);
    } else if (opt.moneyDelta !== undefined && opt.moneyDelta < 0) {
      quality = "bad";
      setStreak(0);
    } else {
      quality = "neutral";
      setStreak(0);
    }

    setFeedbackQuality(quality);
    setFeedbackText(opt.outcome ?? "");
    setFeedbackVisible(true);
  };

  const continueAfterFeedback = () => {
    setFeedbackVisible(false);
    setIsLoading(true);
    onAnswerSubmit(selectedOption!);
  };

  const optionAnimations = scenario.options.map(() => useRef(new Animated.Value(1)).current);

  const handleOptionPress = (index: number, optionText: string) => {
    Animated.sequence([
      Animated.timing(optionAnimations[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(optionAnimations[index], {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedOption(optionText);
  };

  return (
    <>
      <Modal transparent visible={feedbackVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text
              style={[
                styles.feedbackTitle,
                feedbackQuality === "good" && styles.goodText,
                feedbackQuality === "neutral" && styles.neutralText,
                feedbackQuality === "bad" && styles.badText,
              ]}
            >
              {feedbackQuality === "good" ? "Great Choice!" :
               feedbackQuality === "neutral" ? "Decent Choice" : "Risky Choice"}
            </Text>

            <Text style={styles.feedbackBody}>
              {feedbackText}
            </Text>

            <TouchableOpacity style={styles.continueButton} onPress={continueAfterFeedback}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.statsContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.statItem}>
            <UserIcon width={32} height={32} color="#06b6d4" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>{playerStats.age}</Text>
            </View>
          </View>
          {streak > 0 && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>🔥 Streak: {streak}</Text>
          </View>
          )}
          <View style={styles.statItem}>
            <WalletIcon width={32} height={32} color="#022E6B" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Net Worth</Text>
              <Text style={styles.statValue}>${playerStats.netWorth.toLocaleString()}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.scenarioContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.questionRow}>
            <Text style={styles.question}>{scenario.question}</Text>
          </View>

          {!showHint && (
            <TouchableOpacity style={styles.hintButton} onPress={revealHint}>
              <Text style={styles.hintButtonText}>Show Hint</Text>
            </TouchableOpacity>
          )}

          {showHint && (
            <Animated.View style={{ opacity: hintOpacity }}>
              <Text style={styles.hintText}>{scenario.hint}</Text>
            </Animated.View>
          )}

          <View style={styles.optionsContainer}>
            {scenario.options.map((option, index) => {
              const isSelected = selectedOption === option.text;
              const buttonScale = optionAnimations[index];
              const money = option.moneyDelta ?? 0;
              const isPositive = money > 0;
              const isNegative = money < 0;

              return (
                <Animated.View
                  key={index}
                  style={{ transform: [{ scale: buttonScale }] }}
                >
                  <TouchableOpacity
                    onPress={() => handleOptionPress(index, option.text)}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {option.text}
                      </Text>

                      <Text
                        style={[
                          styles.moneyDelta,
                          isPositive && styles.moneyDeltaPositive,
                          isNegative && styles.moneyDeltaNegative,
                          isSelected && styles.moneyDeltaSelected,
                        ]}
                      >
                        {isPositive ? "+" : ""}${money.toLocaleString()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selectedOption || isLoading}
            style={[
              styles.submitButton,
              (!selectedOption || isLoading) && styles.submitButtonDisabled,
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Loading..." : "Make Choice"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "90%",
    maxWidth: 380,
    elevation: 6,
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  goodText: { color: "#022E6B" },
  neutralText: { color: "#fbbf24" },
  badText: { color: "#ef4444" },
  feedbackBody: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 20,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moneyDelta: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },
  moneyDeltaPositive: {
    color: "#022E6B",
  },
  moneyDeltaNegative: {
    color: "#ef4444",
  },
  moneyDeltaSelected: {
    color: "#ffffff",
  },

  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statTextContainer: {
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  streakContainer: {
  backgroundColor: "#fef3c7",
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 12,
  alignSelf: "center",
  marginBottom: 16,
  },
  streakText: {
    color: "#b45309",
    fontSize: 16,
    fontWeight: "700",
  },
  scenarioContainer: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  scenarioText: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 24,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },
  hintButton: {
    alignSelf: "flex-start",
    backgroundColor: "#e0f2fe",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  hintButtonText: {
    color: "#0284c7",
    fontSize: 14,
    fontWeight: "600",
  },
  hintText: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    color: "#0369a1",
    marginBottom: 20,
    fontSize: 15,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#f3f4f6",
  },
  optionButtonSelected: {
    backgroundColor: "#06b6d4",
    borderColor: "#0891b2",
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
    textAlign: "left",
  },
  optionTextSelected: {
    color: "#ffffff",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#022E6B",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: "center",
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;
