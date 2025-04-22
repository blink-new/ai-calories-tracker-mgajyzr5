
export interface Meal {
  id: string;
  userId: string;
  name: string;
  calories: number;
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyCalories {
  date: string;
  totalCalories: number;
  goal: number;
  meals: Meal[];
}

export interface CalorieEstimation {
  foodName: string;
  calories: number;
  confidence: number;
}