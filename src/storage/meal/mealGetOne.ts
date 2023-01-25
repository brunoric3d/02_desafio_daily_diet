import { MEAL_COLLECTION } from './../storageConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from './mealDTO';

export async function mealGetOne(id: string) {
  try {
    const storage = await AsyncStorage.getItem(MEAL_COLLECTION);

    const meals: Meal[] = storage ? JSON.parse(storage) : [];
    const [meal] = meals.filter(item => item.id === id)!
    return meal;

  } catch (error) {
    throw error;
  }
}