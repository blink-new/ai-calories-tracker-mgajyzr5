
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function SettingsScreen() {
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('2000');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Animated.View 
          style={styles.header}
          entering={FadeInUp.duration(500).delay(100)}
        >
          <Text style={styles.headerTitle}>Settings</Text>
        </Animated.View>

        <Animated.View 
          style={styles.section}
          entering={FadeInUp.duration(500).delay(200)}
        >
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Daily Calorie Goal</Text>
              <TextInput
                style={styles.input}
                value={dailyCalorieGoal}
                onChangeText={setDailyCalorieGoal}
                keyboardType="numeric"
                placeholder="Enter calorie goal"
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.section}
          entering={FadeInUp.duration(500).delay(300)}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Switch
                trackColor={{ false: '#D1D1D6', true: '#A5D6A7' }}
                thumbColor={notificationsEnabled ? '#4CAF50' : '#F4F3F4'}
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            </View>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                trackColor={{ false: '#D1D1D6', true: '#A5D6A7' }}
                thumbColor={darkModeEnabled ? '#4CAF50' : '#F4F3F4'}
                onValueChange={setDarkModeEnabled}
                value={darkModeEnabled}
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.section}
          entering={FadeInUp.duration(500).delay(400)}
        >
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color="#4CAF50" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Help & Support</Text>
              <Text style={styles.settingValue}>Contact us</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={styles.section}
          entering={FadeInUp.duration(500).delay(500)}
        >
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <LogOut size={20} color="#FF5252" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingLabel, { color: '#FF5252' }]}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={styles.versionContainer}
          entering={FadeInUp.duration(500).delay(600)}
        >
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  settingValue: {
    fontSize: 16,
    color: '#8E8E93',
  },
  input: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'right',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    width: 100,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});