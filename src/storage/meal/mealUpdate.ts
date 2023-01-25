import { MEAL_COLLECTION } from './../storageConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { mealsGetAll } from "./mealsGetAll";
import { Meal } from "./mealDTO"

export async function mealUpdate(meal: Meal) {
  try {
    const storedMeals = await mealsGetAll()
    for (let i = 0; i < storedMeals.length; i++) {
      if (storedMeals[i].id === meal.id) {
        storedMeals[i] = meal;
      }
    }

    const storage = JSON.stringify(storedMeals)
    await AsyncStorage.setItem(MEAL_COLLECTION, storage)
  } catch (error) {
    throw error;
  }
}
