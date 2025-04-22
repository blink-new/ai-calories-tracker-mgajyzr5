
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CircleCheck } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function HistoryScreen() {
  // Mock data for meal history
  const mealHistory = [
    {
      date: 'Today',
      meals: [
        { id: 1, name: 'Breakfast', calories: 350, time: '8:30 AM' },
        { id: 2, name: 'Lunch', calories: 550, time: '12:45 PM' },
        { id: 3, name: 'Snack', calories: 150, time: '3:30 PM' },
      ],
      totalCalories: 1050,
    },
    {
      date: 'Yesterday',
      meals: [
        { id: 4, name: 'Breakfast', calories: 320, time: '8:15 AM' },
        { id: 5, name: 'Lunch', calories: 600, time: '1:00 PM' },
        { id: 6, name: 'Dinner', calories: 750, time: '7:30 PM' },
      ],
      totalCalories: 1670,
    },
    {
      date: 'Monday, June 10',
      meals: [
        { id: 7, name: 'Breakfast', calories: 400, time: '9:00 AM' },
        { id: 8, name: 'Lunch', calories: 520, time: '12:30 PM' },
        { id: 9, name: 'Snack', calories: 200, time: '4:00 PM' },
        { id: 10, name: 'Dinner', calories: 680, time: '8:00 PM' },
      ],
      totalCalories: 1800,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View 
          style={styles.header}
          entering={FadeInUp.duration(500).delay(100)}
        >
          <Text style={styles.headerTitle}>Meal History</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={20} color="#4CAF50" />
            <Text style={styles.calendarText}>View Calendar</Text>
          </TouchableOpacity>
        </Animated.View>

        {mealHistory.map((day, dayIndex) => (
          <Animated.View 
            key={day.date} 
            style={styles.daySection}
            entering={FadeInUp.duration(500).delay(200 + (dayIndex * 100))}
          >
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{day.date}</Text>
              <Text style={styles.totalCalories}>{day.totalCalories} calories</Text>
            </View>

            {day.meals.map((meal, mealIndex) => (
              <Animated.View 
                key={meal.id} 
                style={styles.mealCard}
                entering={FadeInUp.duration(400).delay(300 + (mealIndex * 50))}
              >
                <View style={styles.mealTimeContainer}>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                </View>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <View style={styles.calorieContainer}>
                    <CircleCheck size={16} color="#4CAF50" />
                    <Text style={styles.calorieText}>{meal.calories} calories</Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </Animated.View>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  calendarText: {
    marginLeft: 6,
    color: '#4CAF50',
    fontWeight: '500',
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  totalCalories: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  mealTimeContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
  },
  mealTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
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