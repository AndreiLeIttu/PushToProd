import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PiggyBankIcon } from './icons/PiggyBankIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { WalletIcon } from './icons/WalletIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { HeartIcon } from './icons/HeartIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { ChartIcon } from './icons/ChartIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { PercentIcon } from './icons/PercentIcon';
import { BankIcon } from './icons/BankIcon';

interface Concept {
  id: string;
  name: string;
  description: string;
  quizQuestion: string;
  quizOptions: string[];
  correctAnswerIndex: number;
  quizExplanation: string;
}

const ALL_CONCEPTS: Concept[] = [
  {
    id: 'savings',
    name: 'Savings',
    description: 'Saving means putting money aside for future use. It\'s important to save for emergencies, big purchases, and long-term goals like retirement. It\'s like saving a few of your favorite snacks now so you\'ll have them when you really want them later.',
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
    id: 'investing-basics',
    name: 'Investing Basics',
    description: 'Investing means using your money to buy assets (like stocks, bonds, or real estate) that can grow in value over time. It\'s riskier than saving but can help your money grow faster.',
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
    id: 'loans-&-debt',
    name: 'Loans & Debt',
    description: 'Loans and debt mean borrowing money now and paying it back later with some extra added. It\'s like borrowing a friend\'s bike—you return it, but you might also clean it or bring them a snack because they helped you out.',
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
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance protects you from financial loss by transferring risk to an insurance company. You pay premiums in exchange for coverage.',
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
    id: 'income,-paychecks-&-taxes',
    name: 'Income, Paychecks & Taxes',
    description: 'Income is the money you earn, and taxes are small parts taken by the government to pay for things like schools, roads, and hospitals. It\'s like earning a pizza and giving a few slices to help keep the home running—like paying for Wi-Fi or electricity.',
    quizQuestion: 'What is a benefit of contributing to a 401(k) retirement account?',
    quizOptions: [
      'You never have to pay taxes',
      'It reduces your taxable income',
      'You can withdraw money anytime without penalty'
    ],
    correctAnswerIndex: 1,
    quizExplanation: '401(k) contributions reduce your taxable income now, and the money grows tax-deferred until you withdraw it in retirement.'
  },
  {
    id: "sharing/charity",
    name: "Sharing/Charity",
    description: "Sharing or giving to charity means using a bit of your money to help others or support a cause you care about. It's like sharing a pencil or snack with a friend who forgot theirs - it costs you little, but means a lot to them.",
    quizQuestion: 'Why is donating a small part of your money to charity considered a good financial habit?',
    quizOptions: [
      'Because it helps you earn extra pocket money',
      'Because it teaches you to budget and think about others',
      'Because it means you never have to save money',
      'Because charities will give the money back later',
    ],
    correctAnswerIndex: 1,
    quizExplanation: 'Sharing even a small amount reminds you to be kind, responsible, and thoughtful about how you use your money.'
  },
  {
    id: "opportunity-cost",
    name: "Opportunity cost",
    description: "Opportunity cost is what you give up when you choose one thing instead of another. It's like using your only free hour to watch a show—doing that means you miss out on gaming or hanging out with friends.",
    quizQuestion: 'What is an opportunity cost?',
    quizOptions: [
      'The money you hide in your room',
      'The reward you get for doing chores',
      'What you give up when you choose one thing instead of another',
      'A special discount at a store',
    ],
    correctAnswerIndex: 2,
    quizExplanation: 'Opportunity cost means choosing one thing and giving up something else — it reminds you that every choice has a trade-off.'
  },
  {
    id: "scarcity",
    name: "Scarcity",
    description: "Scarcity means something is limited, and limited things usually become more valuable. It's like a limited-edition hoodie drop—because there aren't many available, everyone wants one and the price goes up.",
    correctAnswerIndex: 1,
    quizExplanation: 'It shows scarcity because the bakery has limited resources and can\'t make endless cupcakes, even when more people want them',
    quizOptions: [
      'There is no scarcity because some cupcakes are left',
      'Scarcity, because the bakery cannot produce unlimited cupcakes even if demand changes',
      'Scarcity only on days when the cupcakes sell out',
      'There is never scarcity if people come early'
    ],
    quizQuestion: 'A bakery can make only 20 cupcakes each morning. On some days they have leftover cupcakes, and on other days they sell out before noon. What does this situation show?'
  },
  {
    id: "simple-budgeting",
    name: "Simple Budgeting",
    description: "Budgeting means planning how to divide your money between needs, wants, and savings. It's like managing your stamina in a game—if you use it all at once, you run out fast, but if you spread it out, you last longer.",
    correctAnswerIndex: 2,
    quizExplanation: 'A budget helps you plan your spending and saving so you can reach your goals without running out of money.',
    quizOptions: [
      'Spend all your money right away',
      'Guess how much you might spend',
      'Plan how to save some money now so you can afford the toy later',
      'Borrow money from everyone you know',
    ],
    quizQuestion: 'You get $10 a week. You want a $12 toy, but you also like buying snacks. What should a good budget help you do?'
  },
  {
    id: "banks-&-account",
    name: "Banks & Account",
    description: "A bank keeps your money safe and helps you store, move, or grow it. It's like having a super-secure digital backpack—you can access it anytime and can't lose it like cash in your pocket.",
    correctAnswerIndex: 3,
    quizExplanation: 'Bank accounts are safer than keeping the money yourself, and definitely safer than giving the money to someone else.',
    quizOptions: [
      'Put it under your mattress',
      'Give it to a close friend to keep it for you',
      'Keep it in a hidden place in your house',
      'Deposit it inside a bank account'
    ],
    quizQuestion: 'You suddenly won a large sum of money. What is a responsible way of keeping the money safe?'
  },
  {
    id: 'interest',
    name: 'Interest',
    description: "Interest is the extra money involved when you save or borrow: you earn interest when the bank pays you for saving, and you pay interest when you borrow. Saving is like planting a seed that grows; borrowing is like returning a charger with a snack as thanks.",
    quizExplanation: 'Interest is the extra money the bank adds to your savings as a reward for keeping your money there.',
    quizOptions: [
      'Extra money the bank gives you for keeping your savings there',
      'A fee you must pay every time you visit the bank',
      'Money that disappears from your account over time',
      'A game banks play to decide who gets more money'
    ],
    quizQuestion: 'What is interest when you save money in a bank?',
    correctAnswerIndex: 0
  },
  {
    id: 'short-term-vs-long-term',
    name: 'Short-term vs long-term',
    description: 'Short-term goals are things you want soon, while long-term goals take more time and planning. It\'s like a sprint versus a marathon—a sprint is quick like saving for headphones, while a marathon is slow and steady like saving for a laptop.',
    quizExplanation: 'A long-term choice is something you save for over time, like the backpack next month.',
    quizOptions: [
      'Buying the small toy now',
      'Saving your money for the backpack',
      'Spending half and saving half',
      'Not choosing anything'
    ],
    quizQuestion: 'You have $15. You can either buy some sweets today, or save for a new phone that you really want next month. What is the long-term choice?',
    correctAnswerIndex: 1
  },
  {
    id: 'stocks,-bonds-&-mutual-funds',
    name: 'Stocks, Bonds & Mutual Funds',
    description: 'Stocks let you own part of a company, bonds let you lend money for a promise of extra repayment, and mutual funds let many people invest together. It\'s like owning a slice of a big pizza (stocks), lending a friend $10 and getting $12 back (bonds), or pooling money with friends to buy a big pizza and sharing it (mutual funds).',
    quizExplanation: 'Stocks make you part owner of a company, while bonds are loans you give and get back with interest.',
    quizOptions: [
      'A stock means you own a small piece of a company, while a bond is money you lend that gets paid back later',
      'A stock is always safe, and a bond is always risky',
      'A stock is only for kids, and a bond is only for adults',
      'A bond lets you control the company you invest in'
    ],
    quizQuestion: 'What is the main difference between a stock and a bond?',
    correctAnswerIndex: 0
  },
  {
    id: 'risks-&-diversification',
    name: 'Risks & Diversification',
    description: 'Risk means your investment can go up or down, and diversification means spreading your money across different things so one mistake doesn\'t ruin everything. It\'s like carrying eggs in multiple baskets—if you drop one, the rest are still safe.',
    quizExplanation: 'Diversification lowers risk because if one investment loses value, the others can help balance it out.',
    quizOptions: [
      'Because it guarantees you will always make more money',
      'Because different investments grow at the same speed',
      'Because diversification reduces risk if one investment does badly',
      'Because it makes your bank account look bigger'
    ],
    quizQuestion: 'Why is it safer to spread your money across different investments instead of putting it all in one place?',
    correctAnswerIndex: 2
  }
];

interface ConceptsLibraryProps {
  onBack?: () => void;
  selectedConceptId?: string | null;
  onConceptSelected?: () => void;
}

// Function to get the appropriate icon for each concept
const getConceptIcon = (conceptId: string) => {
  const iconProps = { width: 32, height: 32, color: "#06b6d4" };
  
  switch (conceptId) {
    case 'savings':
      return <PiggyBankIcon {...iconProps} />;
    case 'investing-basics':
      return <ChartIcon {...iconProps} />;
    case 'credit':
      return <CreditCardIcon {...iconProps} />;
    case 'loans-&-debt':
      return <WalletIcon {...iconProps} />;
    case 'insurance':
      return <ShieldIcon {...iconProps} />;
    case 'income,-paychecks-&-taxes':
      return <DocumentIcon {...iconProps} />;
    case 'sharing/charity':
      return <HeartIcon {...iconProps} />;
    case 'opportunity-cost':
      return <ScaleIcon {...iconProps} />;
    case 'scarcity':
      return <ChartIcon {...iconProps} />;
    case 'simple-budgeting':
      return <WalletIcon {...iconProps} />;
    case 'banks-&-account':
      return <BankIcon {...iconProps} />;
    case 'interest':
      return <PercentIcon {...iconProps} />;
    case 'short-term-vs-long-term':
      return <CalendarIcon {...iconProps} />;
    case 'stocks,-bonds-&-mutual-funds':
      return <TrophyIcon {...iconProps} />;
    case 'risks-&-diversification':
      return <ChartIcon {...iconProps} />;
    default:
      return <BookOpenIcon {...iconProps} />;
  }
};

const ConceptsLibrary: React.FC<ConceptsLibraryProps> = ({ onBack, selectedConceptId, onConceptSelected }) => {
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
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizAnswer = (index: number) => {
    if (showQuizResult) return;
    setSelectedQuizAnswer(index);
    setShowQuizResult(true);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Financial Concepts Library</Text>
        <Text style={styles.subtitle}>
          Study these concepts before/after starting your simulation
        </Text>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {ALL_CONCEPTS.map((concept, index) => {
          return (
            <Animated.View
              key={concept.id}
              style={[
                styles.conceptCard, false,
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
                  {getConceptIcon(concept.id)}
                  <View style={styles.conceptHeaderText}>
                    <Text style={styles.conceptName}>{concept.name}</Text>
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
                            {selectedQuizAnswer === selectedConcept.correctAnswerIndex ? '✓ Correct!' : '✕ Not quite'}
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
    backgroundColor: '#022E6B',
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
    borderColor: '#022E6B',
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
    color: '#022E6B',
    fontWeight: '600',
    marginTop: 4,
  },
  conceptDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#022E6B',
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
    color: '#022E6B',
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
    backgroundColor: '#022E6B',
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
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
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
    color: '#166534',
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

