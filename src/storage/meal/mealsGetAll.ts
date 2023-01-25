import { MEAL_COLLECTION } from './../storageConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { Meal } from './mealDTO';

export async function mealsGetAll() {
  try {
    // await AsyncStorage.removeItem(MEAL_COLLECTION);
    const storage = await AsyncStorage.getItem(MEAL_COLLECTION);
    const meals: Meal[] = storage ? JSON.parse(storage) : [];
    return meals;

  } catch (error) {
    throw error;
  }
}