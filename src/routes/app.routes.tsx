import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { MealCreatedFeedback } from '@screens/MealCreatedFeedback';
import { NewMeal } from '@screens/NewMeal';
import { ShowMeal } from '@screens/ShowMeal';
import { Statistics } from '@screens/Statistics';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newMeal" component={NewMeal} />
      <Screen name="showMeal" component={ShowMeal} />
      <Screen name="statistics" component={Statistics} options={{ animation: 'fade_from_bottom' }} />
      <Screen name="mealCreatedFeedback" component={MealCreatedFeedback} options={{ animation: 'fade_from_bottom' }} />

    </Navigator>
  );

}