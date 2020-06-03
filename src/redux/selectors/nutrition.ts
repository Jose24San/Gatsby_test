import { fatRatios, proteinRatios } from "../../utilties/nutritionFormulas"

export const getNutrition = state => state.nutrition;

export const getNutritionGoal = state => {
  const nutrition = getNutrition( state );
  return ( nutrition.weeklyTargets ) ? nutrition.weeklyTargets.goal : 'Maintenance';
};

export const getBMRformula = state => {
  const nutrition = getNutrition( state );

  if ( nutrition.calorieRequirements ) {
    return nutrition.calorieRequirements.formula;
  }

  return 'Mifflin-St Jeor';
};

export const getCalorieRequirements = state => {
  const nutrition = getNutrition( state );
  return nutrition.calorieRequirements;
}

export const getDailyCaloriesForWeek = state => {
  const nutrition = getNutrition( state );

  if ( nutrition && nutrition.weeklyTargets && nutrition.weeklyTargets.days ) {
    return nutrition.weeklyTargets.days;
  }

  return [];
};

export const getMacroPlanStep = state => {
  const { weeklyTargets } = getNutrition( state );
  const calorieRequirements = getCalorieRequirements( state );

  if ( weeklyTargets && Object.keys( weeklyTargets ).length > 1 ) {
    return 3;
  }

  if ( calorieRequirements && Object.keys( calorieRequirements ).length > 1 ) {
    return 2;
  }

  return 1;
};

export const getMacroNumbers = ( options: {
  userWeight: number,
  calories: number,
  day: 'nonWorkout' | 'lightWorkout' | 'hardWorkout'
  goal: 'Lose Weight' | 'Gain Weight' | 'Maintenance'
} ) => {
  const { calories, day, goal, userWeight } = options;
  let protein;
  let carbs;
  let fats;
  let caloriesLeft;

  if ( goal === 'Lose Weight' ) {
    if ( day === 'nonWorkout' ) {
      protein = Math.ceil( userWeight * proteinRatios.hypoCaloric )
      fats = Math.floor( userWeight * fatRatios.hypocaloric )
    }
    else if ( day === 'lightWorkout' || day === 'hardWorkout' ) {
      protein = Math.ceil( userWeight * proteinRatios.hypoCaloricWorkoutDay );
      fats = Math.floor( userWeight * fatRatios.hypocaloricWorkoutDay );
    }
  }
  else if ( goal === 'Maintenance' ) {
    protein = Math.ceil( userWeight * proteinRatios.maintenance );
    fats = Math.floor( userWeight * fatRatios.maintenance );
  }
  else if ( goal === 'Gain Weight' ) {
    protein = Math.ceil( userWeight * proteinRatios.hyperCaloric );
    fats = Math.floor( userWeight * fatRatios.hyperCaloric )
  }

  caloriesLeft = calories - ( ( protein * 4 ) + ( fats * 9 ) );
  carbs = Math.ceil( caloriesLeft / 4 );

  return {
    protein,
    carbs,
    fats,
  };
};

export const getTableCalorieRequirements = state => {
  const calorieRequirements = getCalorieRequirements( state );

  if ( calorieRequirements && calorieRequirements.maintenance ) {
    return [
      {
        day: 'Maintenance',
        calories: calorieRequirements.maintenance,
      },
      {
        day: 'Light Workout',
        calories: calorieRequirements.lightWorkout,
      },
      {
        day: 'Hard Workout',
        calories: calorieRequirements.hardWorkout,
      }
    ]
  }
};

export const getUserWeight = state => {
  const nutrition = getNutrition( state );
  return nutrition.userDetails.weight;
};


