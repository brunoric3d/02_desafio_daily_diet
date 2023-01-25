import { MEAL_COLLECTION } from './../storageConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { mealsGetAll } from "./mealsGetAll";
import { Meal } from "./mealDTO"

export async function mealCreate(meal: Meal) {
  try {
    const storedMeals = await mealsGetAll()

    const storage = JSON.stringify([...storedMeals, meal])
    await AsyncStorage.setItem(MEAL_COLLECTION, storage)
  } catch (error) {
    throw error;
  }
}