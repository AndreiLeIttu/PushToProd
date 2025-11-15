import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Option } from '../types/simulation';

// Enhanced MCQ-style Decision Card Component
// Made more engaging for young users

interface DecisionCardProps {
  option: Option;
  onSelect: () => void;
  selected?: boolean;
  optionLetter?: string; // A, B, C, D
}

export default function DecisionCard({ option, onSelect, selected = false, optionLetter }: DecisionCardProps) {
  const hasImpact = (impact: number | undefined) => impact !== undefined && impact !== 0;
  
  const impacts = [];
  if (hasImpact(option.financialImpact.savings)) {
    impacts.push({
      label: 'Savings',
      value: option.financialImpact.savings!,
      icon: option.financialImpact.savings! > 0 ? '📈' : '📉',
      color: option.financialImpact.savings! > 0 ? '#2e7d32' : '#d32f2f',
    });
  }
  if (hasImpact(option.financialImpact.income)) {
    impacts.push({
      label: 'Income',
      value: option.financialImpact.income!,
      icon: option.financialImpact.income! > 0 ? '💵' : '❌',
      color: option.financialImpact.income! > 0 ? '#2e7d32' : '#d32f2f',
    });
  }
  if (hasImpact(option.financialImpact.expenses)) {
    impacts.push({
      label: 'Expenses',
      value: option.financialImpact.expenses!,
      icon: '💸',
      color: '#d32f2f',
    });
  }
  if (hasImpact(option.financialImpact.debt)) {
    impacts.push({
      label: 'Debt',
      value: option.financialImpact.debt!,
      icon: option.financialImpact.debt! > 0 ? '⚠️' : '✅',
      color: option.financialImpact.debt! > 0 ? '#d32f2f' : '#2e7d32',
    });
  }

  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
      <Card
        style={[
          styles.card,
          selected && styles.selectedCard,
          selected && { backgroundColor: '#f3e5f5' }
        ]}
        mode={selected ? 'elevated' : 'outlined'}
      >
        <Card.Content style={styles.cardContent}>
          {/* Option Letter Badge (A, B, C, D) */}
          <View style={[styles.optionBadge, selected && styles.selectedBadge]}>
            <Text variant="titleLarge" style={[styles.badgeText, selected && styles.selectedBadgeText]}>
              {optionLetter || ''}
            </Text>
          </View>

          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Text variant="titleMedium" style={[styles.optionText, selected && styles.selectedText]}>
              {option.text}
            </Text>

            {option.financialImpact.description && (
              <Text variant="bodySmall" style={styles.description}>
                {option.financialImpact.description}
              </Text>
            )}

            {/* Financial Impacts */}
            {impacts.length > 0 && (
              <View style={styles.impactsContainer}>
                {impacts.map((impact, idx) => (
                  <View key={idx} style={styles.impactRow}>
                    <Text style={styles.impactIcon}>{impact.icon}</Text>
                    <Text style={[styles.impactValue, { color: impact.color }]}>
                      {impact.value > 0 ? '+' : ''}${Math.abs(impact.value).toLocaleString()}
                    </Text>
                    <Text style={styles.impactLabel}>{impact.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Selected Indicator */}
            {selected && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedIndicatorText}>✓ Selected</Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  selectedCard: {
    borderColor: '#6200ee',
    borderWidth: 3,
    elevation: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  optionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedBadge: {
    backgroundColor: '#6200ee',
  },
  badgeText: {
    fontWeight: 'bold',
    color: '#666',
  },
  selectedBadgeText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  optionText: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  selectedText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginBottom: 12,
    fontSize: 13,
    lineHeight: 20,
  },
  impactsContainer: {
    marginTop: 8,
    gap: 6,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  impactIcon: {
    fontSize: 16,
  },
  impactValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  impactLabel: {
    color: '#666',
    fontSize: 13,
  },
  selectedIndicator: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#6200ee',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  selectedIndicatorText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

