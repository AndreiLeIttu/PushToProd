import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { UserIcon } from './icons/UserIcon';

interface NavigationBarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'start', label: 'Home', icon: UserIcon },
    { id: 'concepts', label: 'Concepts', icon: BookOpenIcon },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
          >
            <Icon width={24} height={24} color={isActive ? '#10b981' : '#6b7280'} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  navItemActive: {
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
  },
  navLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#10b981',
    fontWeight: '600',
  },
});

export default NavigationBar;

