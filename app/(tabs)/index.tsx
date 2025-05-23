
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck, Plus, Camera } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function DashboardScreen() {
  const [calorieGoal] = useState(2000);
  const [currentCalories] = useState(1250);
  const percentage = Math.min(Math.round((currentCalories / calorieGoal) * 100), 100);
  
  // Mock data for recent meals
  const recentMeals = [
    { id: 1, name: 'Avocado Toast', calories: 350, time: '8:30 AM', image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=2070' },
    { id: 2, name: 'Chicken Salad', calories: 550, time: '12:45 PM', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080' },
    { id: 3, name: 'Fruit Smoothie', calories: 150, time: '3:30 PM', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=2071' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
            {/* Progress arc */}
            <View style={[
              styles.progressArc, 
              { 
                transform: [
                  { rotateZ: '0deg' },
                  { rotateY: '180deg' }
                ] 
              }
            ]} />
            <View style={[
              styles.progressArcFilled, 
              { 
                width: 180, 
                height: 180, 
                borderRadius: 90,
                borderWidth: 15,
                borderColor: 'transparent',
                borderTopColor: '#4CAF50',
                transform: [
                  { rotateZ: `${percentage * 3.6}deg` }
                ] 
              }
            ]} />
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
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {recentMeals.map((meal, index) => (
            <Animated.View 
              key={meal.id} 
              style={styles.mealCard}
              entering={FadeInUp.duration(400).delay(400 + (index * 100))}
            >
              <Image 
                source={{ uri: meal.image }} 
                style={styles.mealImage} 
                resizeMode="cover"
              />
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

          <TouchableOpacity 
            style={styles.addMealButton}
            onPress={() => router.push('/camera')}
          >
            <Plus size={20} color="#4CAF50" />
            <Text style={styles.addMealText}>Add another meal</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={styles.tipCard}
          entering={FadeInUp.duration(500).delay(700)}
        >
          <Text style={styles.tipTitle}>Healthy Tip</Text>
          <Text style={styles.tipText}>
            Try to include a variety of colorful vegetables in your meals to ensure you're getting a wide range of nutrients.
          </Text>
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
    paddingBottom: 32,
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
    borderColor: '#E8F5E9',
  },
  progressArcFilled: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
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
  mealImage: {
    width: 80,
    height: 80,
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
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  addMealText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 8,
  },
  tipCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
});