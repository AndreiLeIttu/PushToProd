import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { formatCurrency } from '../utils/financialCalculations';

// Financial Dashboard Widget
// Phase 1, Step 1.3

interface FinancialDashboardProps {
  savings: number;
  income: number;
  expenses: number;
  debt: number;
  showIncome?: boolean;
}

export default function FinancialDashboard({
  savings,
  income,
  expenses,
  debt,
  showIncome = true,
}: FinancialDashboardProps) {
  const netWorth = savings - debt;
  const monthlyIncome = Math.round(income / 12);
  const monthlyNet = monthlyIncome - expenses;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Your Finances
        </Text>

        <View style={styles.statsGrid}>
          <View style={styles.stat}>
            <Text variant="bodySmall" style={styles.label}>
              Savings
            </Text>
            <Text
              variant="titleLarge"
              style={[styles.value, savings >= 0 ? styles.positive : styles.negative]}
            >
              {formatCurrency(savings)}
            </Text>
          </View>

          {showIncome && (
            <View style={styles.stat}>
              <Text variant="bodySmall" style={styles.label}>
                Monthly Income
              </Text>
              <Text variant="titleLarge" style={styles.value}>
                {formatCurrency(monthlyIncome)}
              </Text>
            </View>
          )}

          <View style={styles.stat}>
            <Text variant="bodySmall" style={styles.label}>
              Monthly Expenses
            </Text>
            <Text variant="titleLarge" style={[styles.value, styles.negative]}>
              {formatCurrency(expenses)}
            </Text>
          </View>

          <View style={styles.stat}>
            <Text variant="bodySmall" style={styles.label}>
              Debt
            </Text>
            <Text
              variant="titleLarge"
              style={[styles.value, debt > 0 ? styles.negative : styles.positive]}
            >
              {formatCurrency(debt)}
            </Text>
          </View>
        </View>

        <View style={styles.netWorthContainer}>
          <Text variant="titleSmall" style={styles.netWorthLabel}>
            Net Worth
          </Text>
          <Text
            variant="headlineSmall"
            style={[
              styles.netWorthValue,
              netWorth >= 0 ? styles.positive : styles.negative,
            ]}
          >
            {formatCurrency(netWorth)}
          </Text>
        </View>

        {showIncome && (
          <View style={styles.cashFlowContainer}>
            <Text variant="bodySmall" style={styles.cashFlowLabel}>
              Monthly Cash Flow: 
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.cashFlowValue,
                monthlyNet >= 0 ? styles.positive : styles.negative,
              ]}
            >
              {monthlyNet >= 0 ? '+' : ''}{formatCurrency(monthlyNet)}
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  stat: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  label: {
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
  },
  positive: {
    color: '#2e7d32',
  },
  negative: {
    color: '#d32f2f',
  },
  netWorthContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  netWorthLabel: {
    fontWeight: '600',
  },
  netWorthValue: {
    fontWeight: 'bold',
  },
  cashFlowContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashFlowLabel: {
    color: '#666',
    marginRight: 8,
  },
  cashFlowValue: {
    fontWeight: 'bold',
  },
});

