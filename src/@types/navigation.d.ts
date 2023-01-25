export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      newMeal: {
        id?: string;
      };
      showMeal: {
        id: string;
      };
      editMeal: undefined;
      statistics: undefined;
      mealCreatedFeedback: {
        healthy: boolean;
      }
    }
  }
}