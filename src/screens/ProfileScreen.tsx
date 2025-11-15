import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Button, Divider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Profile
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {user?.name || 'Guest'}
        </Text>
        <Text variant="bodySmall" style={styles.email}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.section}>
        <List.Item
          title="Account"
          description="View and edit your profile"
          left={(props) => <List.Icon {...props} icon="account-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Account')}
        />
        <Divider />
        
        <List.Item
          title="Progress"
          description="View your learning statistics"
          left={(props) => <List.Icon {...props} icon="chart-line" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Progress')}
        />
        <Divider />
        
        <List.Item
          title="Settings"
          description="App preferences and notifications"
          left={(props) => <List.Icon {...props} icon="cog" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Settings')}
        />
        <Divider />
        
        <List.Item
          title="Help & Support"
          description="Get help and contact support"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Help')}
        />
        <Divider />
        
        <List.Item
          title="About"
          description="App version and information"
          left={(props) => <List.Icon {...props} icon="information" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('About')}
        />
      </View>

      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={logout}
          style={styles.logoutButton}
          contentStyle={styles.logoutButtonContent}
          textColor="#d32f2f"
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    fontWeight: 'bold',
  },
  email: {
    color: '#999',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  logoutContainer: {
    padding: 24,
    marginTop: 24,
  },
  logoutButton: {
    borderRadius: 8,
    borderColor: '#d32f2f',
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});

