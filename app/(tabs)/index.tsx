
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function DashboardScreen() {
  const [calorieGoal] = useState(2000);
  const [currentCalories] = useState(1250);
  const percentage = Math.min(Math.round((currentCalories / calorieGoal) * 100), 100);
  
  // Mock data for recent meals
  const recentMeals = [
    { id: 1, name: 'Breakfast', calories: 350, time: '8:30 AM', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2070' },
    { id: 2, name: 'Lunch', calories: 550, time: '12:45 PM', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080' },
    { id: 3, name: 'Snack', calories: 150, time: '3:30 PM', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2075' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View 
          style={styles.header}
          entering={FadeInUp.duration(500).delay(100)}
        >
          <Text style={styles.headerTitle}>Today's Progress</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </Animated.View>

        <Animated.View 
          style={styles.progressContainer}
          entering={FadeInUp.duration(500).delay(200)}
        >
          <View style={styles.circleContainer}>
            <View style={styles.circleOuter}>
              <View style={styles.circleInner}>
                <Text style={styles.percentageText}>{percentage}%</Text>
                <Text style={styles.caloriesText}>{currentCalories} / {calorieGoal}</Text>
              </View>
            </View>
            {/* Progress arc - would be replaced with a proper circular progress component */}
            <View style={[styles.progressArc, { transform: [{ rotate: `${percentage * 3.6}deg` }] }]} />
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statValue}>{calorieGoal - currentCalories} cal</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Goal</Text>
              <Text style={styles.statValue}>{calorieGoal} cal</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.mealsSection}
          entering={FadeInUp.duration(500).delay(300)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/camera')}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {recentMeals.map((meal, index) => (
            <Animated.View 
              key={meal.id} 
              style={styles.mealCard}
              entering={FadeInUp.duration(400).delay(400 + (index * 100))}
            >
              <View style={styles.mealImagePlaceholder}>
                {/* This would be replaced with an actual image component */}
                <Text style={styles.mealImageText}>Food</Text>
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <View style={styles.calorieContainer}>
                  <CircleCheck size={16} color="#4CAF50" />
                  <Text style={styles.calorieText}>{meal.calories} calories</Text>
                </View>
              </View>
            </Animated.View>
          ))}
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
  content: {
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
  date: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 180,
    position: 'relative',
  },
  circleOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  progressArc: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 15,
    borderColor: '#4CAF50',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '0deg' }],
  },
  percentageText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4CAF50',
  },
  caloriesText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  mealsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  mealImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealImageText: {
    color: '#999999',
  },
  mealInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
});