import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface Concept {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  quizQuestion: string;
  quizOptions: string[];
  correctAnswerIndex: number;
  quizExplanation: string;
}

const ALL_CONCEPTS: Concept[] = [
  {
    id: 'budgeting',
    name: 'Budgeting',
    description: 'Budgeting is creating a plan for how you\'ll spend your money. It helps you make sure you have enough for the things you need and want.',
    keyPoints: [
      'Track your income and expenses',
      'Plan your spending before you spend',
      'Save a portion of your income (10-20%)',
      'Review and adjust your budget regularly',
      'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings'
    ],
    examples: [
      'Creating a monthly budget for rent, food, and entertainment',
      'Using apps to track your spending',
      'Setting aside money for emergencies before spending on wants'
    ],
    quizQuestion: 'What is the best way to create a budget?',
    quizOptions: [
      'Spend money first, then see what\'s left',
      'Track your income and expenses, then plan your spending',
      'Don\'t budget at all - just spend when you need things'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'A good budget starts by understanding how much money you have (income) and how much you spend (expenses). Then you can plan how to allocate your money wisely.'
  },
  {
    id: 'saving',
    name: 'Saving',
    description: 'Saving means putting money aside for future use. It\'s important to save for emergencies, big purchases, and long-term goals like retirement.',
    keyPoints: [
      'Save at least 10-20% of your income',
      'Build an emergency fund (3-6 months of expenses)',
      'Save for short-term goals (vacation, car) separately from long-term goals',
      'Automate your savings',
      'Pay yourself first - save before spending'
    ],
    examples: [
      'Putting $100 from each paycheck into a savings account',
      'Saving for a down payment on a house',
      'Building an emergency fund for unexpected expenses'
    ],
    quizQuestion: 'How much of your income should you try to save?',
    quizOptions: [
      'Nothing - spend everything you earn',
      'At least 10-20% of your income',
      'Save only when you have extra money left over'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Financial experts recommend saving at least 10-20% of your income. This helps you build an emergency fund and work toward your financial goals.'
  },
  {
    id: 'investing',
    name: 'Investing',
    description: 'Investing means using your money to buy assets (like stocks, bonds, or real estate) that can grow in value over time. It\'s riskier than saving but can help your money grow faster.',
    keyPoints: [
      'Start investing early to benefit from compound interest',
      'Diversify your investments (don\'t put all eggs in one basket)',
      'Invest for the long term (5+ years)',
      'Understand the risk vs. return trade-off',
      'Consider low-cost index funds for beginners'
    ],
    examples: [
      'Buying stocks in companies you believe in',
      'Investing in a retirement account (401k, IRA)',
      'Diversifying across stocks, bonds, and real estate'
    ],
    quizQuestion: 'What is a key principle of investing?',
    quizOptions: [
      'Put all your money in one investment',
      'Diversify - spread your money across different investments',
      'Only invest in things you understand completely'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Diversification is important because it spreads risk. If one investment loses value, others might gain, helping protect your overall portfolio.'
  },
  {
    id: 'credit',
    name: 'Credit',
    description: 'Credit is the ability to borrow money with a promise to pay it back later. Credit cards and loans are forms of credit. Good credit helps you get better rates on loans.',
    keyPoints: [
      'Pay your bills on time to build good credit',
      'Keep credit card balances low (under 30% of limit)',
      'Don\'t open too many credit accounts at once',
      'Check your credit report regularly',
      'Use credit responsibly - only borrow what you can repay'
    ],
    examples: [
      'Using a credit card and paying the full balance each month',
      'Taking out a student loan for education',
      'Building credit history to qualify for a mortgage'
    ],
    quizQuestion: 'What\'s the best way to use a credit card?',
    quizOptions: [
      'Use it for everything and pay the minimum payment',
      'Use it for small purchases and pay the full balance each month',
      'Never use credit cards - they\'re always bad'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Using a credit card responsibly (paying the full balance each month) helps you build good credit without paying interest or accumulating debt.'
  },
  {
    id: 'debt',
    name: 'Debt',
    description: 'Debt is money you owe to someone else. While some debt (like a mortgage) can be useful, too much debt can be stressful and expensive due to interest payments.',
    keyPoints: [
      'Avoid high-interest debt (credit cards) when possible',
      'Pay more than the minimum payment when you can',
      'Use the debt avalanche or snowball method to pay off debt',
      'Some debt can be good (mortgage, student loans for education)',
      'Don\'t take on debt you can\'t afford to repay'
    ],
    examples: [
      'Paying off credit card debt before it accumulates interest',
      'Taking a mortgage to buy a home (good debt)',
      'Avoiding payday loans with extremely high interest rates'
    ],
    quizQuestion: 'When is it okay to take on debt?',
    quizOptions: [
      'For anything you want right now',
      'For essential things like education or a home, when you can afford the payments',
      'Never - debt is always bad'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Some debt can be beneficial (like student loans for education or a mortgage for a home), but only if you can afford the payments and it helps you build wealth over time.'
  },
  {
    id: 'retirement',
    name: 'Retirement Planning',
    description: 'Retirement planning involves saving and investing money now so you can maintain your lifestyle when you stop working. The earlier you start, the easier it is.',
    keyPoints: [
      'Start saving for retirement as early as possible',
      'Take advantage of employer 401(k) matching',
      'Use retirement accounts (401k, IRA) for tax benefits',
      'Aim to save 15-20% of income for retirement',
      'Consider the 4% rule for retirement withdrawals'
    ],
    examples: [
      'Contributing to a 401(k) with employer matching',
      'Opening an IRA for additional retirement savings',
      'Calculating how much you need to retire comfortably'
    ],
    quizQuestion: 'When should you start saving for retirement?',
    quizOptions: [
      'Wait until you\'re older and making more money',
      'Start as early as possible, even with small amounts',
      'Only when you have extra money left over'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Starting early is crucial because of compound interest. Even small amounts saved in your 20s can grow significantly more than larger amounts saved later in life.'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance protects you from financial loss by transferring risk to an insurance company. You pay premiums in exchange for coverage.',
    keyPoints: [
      'Health insurance protects against medical costs',
      'Auto insurance is required by law in most places',
      'Renters/homeowners insurance protects your belongings',
      'Life insurance provides for your family if you die',
      'Only buy insurance you actually need'
    ],
    examples: [
      'Having health insurance to cover medical emergencies',
      'Car insurance to protect against accidents',
      'Renters insurance to cover stolen or damaged belongings'
    ],
    quizQuestion: 'What is the main purpose of insurance?',
    quizOptions: [
      'To make money by investing premiums',
      'To protect you from financial loss by transferring risk',
      'To avoid paying for things yourself'
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Insurance transfers financial risk to an insurance company. You pay premiums, and in exchange, the company covers losses from covered events.'
  },
  {
    id: 'taxes',
    name: 'Taxes',
    description: 'Taxes are mandatory payments to the government. Understanding taxes helps you plan your finances and take advantage of deductions and credits.',
    keyPoints: [
      'File your taxes on time (usually April 15)',
      'Keep receipts for deductible expenses',
      'Understand the difference between deductions and credits',
      'Consider using tax-advantaged accounts (401k, IRA)',
      'Get help from a tax professional if needed'
    ],
    examples: [
      'Claiming student loan interest as a deduction',
      'Contributing to a 401(k) to reduce taxable income',
      'Filing taxes correctly to avoid penalties'
    ],
    quizQuestion: 'What is a benefit of contributing to a 401(k) retirement account?',
    quizOptions: [
      'You never have to pay taxes',
      'It reduces your taxable income and grows tax-deferred',
      'You can withdraw money anytime without penalty'
    ],
    correctAnswerIndex: 1,
    quizExplanation: '401(k) contributions reduce your taxable income now, and the money grows tax-deferred until you withdraw it in retirement.'
  }
];

interface ConceptsLibraryProps {
  onBack?: () => void;
  studiedConcepts: string[];
  onConceptStudied: (conceptId: string) => void;
  selectedConceptId?: string | null;
  onConceptSelected?: () => void;
}

const ConceptsLibrary: React.FC<ConceptsLibraryProps> = ({ onBack, studiedConcepts, onConceptStudied, selectedConceptId, onConceptSelected }) => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (selectedConceptId) {
      const concept = ALL_CONCEPTS.find(c => c.id === selectedConceptId);
      if (concept) {
        setSelectedConcept(concept);
        setModalVisible(true);
        if (onConceptSelected) {
          onConceptSelected();
        }
      }
    }
  }, [selectedConceptId]);

  const handleConceptPress = (concept: Concept) => {
    setSelectedConcept(concept);
    setModalVisible(true);
    setShowQuiz(false);
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);
    if (!studiedConcepts.includes(concept.id)) {
      onConceptStudied(concept.id);
    }
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizAnswer = (index: number) => {
    if (showQuizResult) return;
    setSelectedQuizAnswer(index);
    setShowQuizResult(true);
  };

  const studiedCount = studiedConcepts.length;
  const totalConcepts = ALL_CONCEPTS.length;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Financial Concepts Library</Text>
        <Text style={styles.subtitle}>
          Study these concepts before starting your simulation
        </Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Studied: {studiedCount} / {totalConcepts}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(studiedCount / totalConcepts) * 100}%` }]} />
          </View>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ALL_CONCEPTS.map((concept, index) => {
          const isStudied = studiedConcepts.includes(concept.id);
          return (
            <Animated.View
              key={concept.id}
              style={[
                styles.conceptCard,
                isStudied && styles.conceptCardStudied,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => handleConceptPress(concept)}
                activeOpacity={0.7}
                style={styles.conceptCardTouchable}
              >
                <View style={styles.conceptHeader}>
                  <BookOpenIcon width={32} height={32} color={isStudied ? "#10b981" : "#06b6d4"} />
                  <View style={styles.conceptHeaderText}>
                    <Text style={styles.conceptName}>{concept.name}</Text>
                    {isStudied && (
                      <Text style={styles.studiedBadge}>✓ Studied</Text>
                    )}
                  </View>
                </View>
                <Text style={styles.conceptDescription} numberOfLines={2}>
                  {concept.description}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedConcept && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedConcept.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        setShowQuiz(false);
                        setSelectedQuizAnswer(null);
                        setShowQuizResult(false);
                      }}
                      style={styles.closeButton}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {!showQuiz ? (
                    <>
                      <Text style={styles.modalDescription}>{selectedConcept.description}</Text>
                      
                      <Text style={styles.sectionTitle}>Key Points:</Text>
                      {selectedConcept.keyPoints.map((point, index) => (
                        <View key={index} style={styles.keyPointItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.keyPointText}>{point}</Text>
                        </View>
                      ))}
                      
                      <Text style={styles.sectionTitle}>Examples:</Text>
                      {selectedConcept.examples.map((example, index) => (
                        <View key={index} style={styles.exampleItem}>
                          <Text style={styles.exampleText}>{example}</Text>
                        </View>
                      ))}
                      
                      <TouchableOpacity
                        style={styles.quizButton}
                        onPress={handleShowQuiz}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.quizButtonText}>Test Your Understanding →</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.quizTitle}>Test Your Understanding</Text>
                      <Text style={styles.quizQuestion}>{selectedConcept.quizQuestion}</Text>
                      
                      <View style={styles.quizOptionsContainer}>
                        {selectedConcept.quizOptions.map((option, index) => {
                          const isSelected = selectedQuizAnswer === index;
                          const isCorrect = index === selectedConcept.correctAnswerIndex;
                          const showResult = showQuizResult;
                          
                          return (
                            <TouchableOpacity
                              key={index}
                              style={[
                                styles.quizOption,
                                showResult && isCorrect && styles.quizOptionCorrect,
                                showResult && isSelected && !isCorrect && styles.quizOptionWrong,
                              ]}
                              onPress={() => handleQuizAnswer(index)}
                              disabled={showResult}
                              activeOpacity={0.7}
                            >
                              <Text style={[
                                styles.quizOptionText,
                                showResult && isCorrect && styles.quizOptionTextCorrect,
                                showResult && isSelected && !isCorrect && styles.quizOptionTextWrong,
                              ]}>
                                {option}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                      
                      {showQuizResult && (
                        <View style={styles.quizExplanationContainer}>
                          <Text style={styles.quizExplanationTitle}>
                            {selectedQuizAnswer === selectedConcept.correctAnswerIndex ? '✓ Correct!' : '✗ Not quite'}
                          </Text>
                          <Text style={styles.quizExplanationText}>
                            {selectedConcept.quizExplanation}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#10b981',
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
    opacity: 0.9,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  conceptCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conceptCardStudied: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  conceptCardTouchable: {
    padding: 16,
  },
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  conceptHeaderText: {
    flex: 1,
  },
  conceptName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  studiedBadge: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
    marginTop: 4,
  },
  conceptDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    gap: 8,
  },
  backButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6b7280',
  },
  modalDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  keyPointItem: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  exampleItem: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  quizButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  quizButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    lineHeight: 26,
  },
  quizOptionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  quizOption: {
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
  },
  quizOptionCorrect: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
  },
  quizOptionWrong: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  quizOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  quizOptionTextCorrect: {
    color: '#065f46',
    fontWeight: '600',
  },
  quizOptionTextWrong: {
    color: '#991b1b',
    fontWeight: '600',
  },
  quizExplanationContainer: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  quizExplanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  quizExplanationText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});

export default ConceptsLibrary;

