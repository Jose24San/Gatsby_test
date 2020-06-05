
export const EVENTS = {
  // General pulse about what people are looking for
  INTERESTED_IN_NUTRITION: 'interested_in_nutrition',
  INTERESTED_IN_WORKOUTS: 'interested_in_workouts',

  // nutrition calculator/macros
  CREATED_CALORIE_TARGETS_1: 'created_calorie_targets_step1',
  CREATED_MACRO_PLAN_2: 'created_macro_plan_step2',

  NUTRITION_PLAN_FOR_MALE: 'nutrition_plan_for_male',
  NUTRITION_PLAN_FOR_FEMALE: 'nutrition_plan_for_female',

  CREATED_NUTRITION_PLAN_FOR_MAINTENANCE: 'created_nutrition_plan_for_maintenance',
  CREATED_NUTRITION_PLAN_FOR_LOSING_WEIGHT: 'created_nutrition_plan_for_losing_weight',
  CREATED_NUTRITION_PLAN_FOR_GAINING_WEIGHT: 'created_nutrition_plan_for_gaining_weight',

  PRINTING_NUTRITION_PLAN: 'printing_nutrition_plan',
};



export const LOG_GA_EVENT = 'LOG_GA_EVENT';


export const logAnalyticEvent = ( eventName: string, options?: any ) => ( {
  type: LOG_GA_EVENT,
  payload: {
    eventName,
    options,
  }
} );

