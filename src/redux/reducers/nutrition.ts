import {
  inchesToCentimeter, katchBMR,
  mifflinBMR,
  poundsToKilograms,
} from "../../utilties/nutritionFormulas"
import { getMacroNumbers } from "../selectors/nutrition"




export const CALCULATE_CALORIE_REQUIREMENTS = 'CALCULATE_CALORIE_REQUIREMENTS';
export const CHANGE_BMR_FORMULA = 'CHANGE_BMR_FORMULA';
export const SET_MAINTENANCE_CALORIES = 'SET_MAINTENANCE_CALORIES';
export const CREATE_NUTRITION_NUMBERS = 'CREATE_NUTRITION_NUMBERS';
export const SETUP_MACRO_USER_DETAILS = 'SETUP_MACRO_USER_DETAILS';





export const calculateCalorieRequirements = ( userDetails: {
  gender?: 'Male' | 'Female',
  age?: number,
  weight?: number,
  height?: {
    feet: number,
    inches: number,
    centimeters?: number,
  },
  bodyFat?: number,
} ) => ( {
  type: CALCULATE_CALORIE_REQUIREMENTS,
  payload: userDetails,
} );

export const changeBMRformula = ( formula: {
  formula: 'Mifflen-St Jeor' | 'Katch-McArdle'
} ) => ( {
  type: CHANGE_BMR_FORMULA,
  payload: formula,
} );

export const createNutritionNumbers = ( dailyTargets: {
  goal: 'Lose Weight' | 'Gain Muscle' | 'Maintenance',
  dietLength: string | undefined,
  workoutDays: string[],
  targetWeeklyWeightLoss: number | undefined,
} ) => ( {
  type: CREATE_NUTRITION_NUMBERS,
  payload: dailyTargets,
} );

export const setMaintenanceCalories = ( details: {
  day: Days,
  label: 'lightWorkout' | 'hardWorkout',
} ) => ( {
  type: SET_MAINTENANCE_CALORIES,
  payload: details,
} )

export const setupMacroUserDetails = () => ( {
  type: SETUP_MACRO_USER_DETAILS,
} );






const calculateCalories = ( state, action ) => {
  const { gender, age, weight, height, bodyFat } = action.payload;
  const { formula } = state.calorieRequirements;

  const weightInKg = poundsToKilograms( weight );
  let calorieTargets;

  if ( formula === 'Mifflin-St Jeor' ) {
    const inches = height.feet * 12 + height.inches;
    const centimeters = inchesToCentimeter( inches );

    calorieTargets = mifflinBMR( {
      gender,
      age,
      weight: weightInKg,
      centimeters,
    } );
  }

  if ( formula === 'Katch-McArdle' ) {
    calorieTargets = katchBMR( {
      weight: weightInKg,
      bodyFat
    } );
  }

  return {
    userDetails: {
      gender: gender || '',
      age: age || '',
      weight: weight || '',
      height: {
        feet: formula === 'Mifflin-St Jeor' ? height.feet : '',
        inches: formula === 'Mifflin-St Jeor' ? height.inches : '',
        centimeters: '',
      },
      bodyFat: bodyFat || '',
    },
    calorieRequirements: {
      ...state.calorieRequirements,
      ...calorieTargets,
    },
  }
};

const handleSetupMacroUserDetails = () => {
  return {
    userDetails: {
      gender: '',
      age: '',
      weight: '',
      height: {
        feet: '',
        inches: '',
        centimeters: '',
      },
      bodyFat: '',
    },
    calorieRequirements: {
      formula: 'Mifflin-St Jeor',
    },
  }
};

const handleSettingMaintenanceCalories = ( state, action ) => {
  const { day, label: value } = action.payload;
  const { days, targetWeeklyWeightLoss, goal } = state.weeklyTargets;

  let targetCalories;
  if ( goal === 'Lose Weight' ) {
    const dailyDeficit = ( targetWeeklyWeightLoss * 3500 ) / 7;
    targetCalories = state.calorieRequirements[ value ] - dailyDeficit
  }
  else if ( goal === 'Maintenance' ) {
    targetCalories = state.calorieRequirements[ value ]
  }

  const updatedDays = days.map( item => {
    if ( item.day === day ) {
      const calorieOptions = item.calorieOptions.map( option => {
        if ( option.value === value ) {
          return {
            ...option,
            selected: true,
          }
        }

        return {
          value: option.value,
          label: option.label,
        }
      } );

      const macros = getMacroNumbers( {
        day: value,
        calories: targetCalories,
        userWeight: state.userDetails.weight,
        goal,
      } )

      return {
        ...item,
        macros,
        targetCalories,
        calorieOptions,
      };
    }

    return item;
  } );

  return {
    ...state,
    weeklyTargets: {
      ...state.weeklyTargets,
      days: updatedDays,
    }
  };
};

const handleCreatingNutritionNumbers = ( state, action ) => {
  const { goal, dietLength, workoutDays, targetWeeklyWeightLoss } = action.payload;
  const { calorieRequirements } = state;
  const { maintenance, lightWorkout } = calorieRequirements;
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const nonWorkoutOptions = [
    { value: 'maintenance', label: 'Maintenance', selected: true },
  ];
  const workoutOptions = [
    { value: 'lightWorkout', label: 'Light Workout', selected: true },
    { value: 'hardWorkout', label: 'Hard Workout' },
  ];
  const totalDays = days.length;

  if ( goal === 'Lose Weight' ) {
    const weeklyDeficit = targetWeeklyWeightLoss * 3500;
    const dailyDeficit = weeklyDeficit / totalDays;

    const caloriesPerDay = days.map( day => {
      const isWorkoutDay = workoutDays.includes( day );
      const calorieNeeds = isWorkoutDay ? lightWorkout : maintenance;
      let calorieOptions = isWorkoutDay ? workoutOptions : nonWorkoutOptions;
      const targetCalories = calorieNeeds - dailyDeficit;

      const macros = getMacroNumbers( {
        day: isWorkoutDay ? 'lightWorkout' : 'nonWorkout',
        calories: targetCalories,
        userWeight: state.userDetails.weight,
        goal: 'Lose Weight',
      } );

      return {
        day,
        workout: isWorkoutDay,
        calorieOptions,
        targetCalories: calorieNeeds - dailyDeficit,
        macros,
        override: undefined,
      }
    } );

    return {
      ...state,
      weeklyTargets: {
        goal,
        dietLength: parseInt( dietLength.split( ' ' )[ 0 ], 10 ),
        workoutDays,
        targetWeeklyWeightLoss,
        days: caloriesPerDay,
      }
    }
  }
  else if ( goal === 'Maintenance' ) {
    const caloriesPerDay = days.map( day => {
      const isWorkoutDay = workoutDays.includes( day );
      const calorieNeeds = isWorkoutDay ? lightWorkout : maintenance;
      let calorieOptions = isWorkoutDay ? workoutOptions : nonWorkoutOptions;

      const macros = getMacroNumbers( {
        day: isWorkoutDay ? 'lightWorkout' : 'nonWorkout',
        userWeight: state.userDetails.weight,
        goal,
        calories: calorieNeeds,
      } );

      return {
        day,
        workout: isWorkoutDay,
        calorieOptions,
        targetCalories: calorieNeeds,
        macros,
        override: undefined,
      };
    } );

    return {
      ...state,
      weeklyTargets: {
        goal,
        workoutDays,
        days: caloriesPerDay,
      },
    }

  }
};

export const nutritionReducer = ( state: State = {}, action ) => {
  switch( action.type ) {

    case CALCULATE_CALORIE_REQUIREMENTS:
      return calculateCalories( state, action );

    case CHANGE_BMR_FORMULA:
      return {
        ...state,
        calorieRequirements: {
          formula: action.payload.formula,
        }
      };

    case SET_MAINTENANCE_CALORIES:
      return handleSettingMaintenanceCalories( state, action );

    case SETUP_MACRO_USER_DETAILS:
      return handleSetupMacroUserDetails();

    case CREATE_NUTRITION_NUMBERS:
      return handleCreatingNutritionNumbers( state, action );

    default:
      return state;
  }
}





type Days = 'Monday' | 'Tuesday' | 'Wendesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

type State = {
  userDetails?: {
    gender?: 'Male' | 'Female',
    age?: number,
    weight?: number,
    height?: {
      feet?: number,
      inches?: number,
      centimeters?: number,
    },
    bodyFat?: number,
  },
  calorieRequirements?: {
    formula?: 'Mifflin-St Jeor' | 'Katch-McArdle',
    maintenance?: number,
    lightWorkout?: number,
    hardWorkout?: number,
  },
  weeklyTargets?: {
    goal?: 'Lose Weight' | 'Gain Muscle' | 'Maintenance',
    dietLength?: number,
    workoutDays?: string[],
    targetWeeklyWeightLoss?: number,
    overrides?: {
      [ x in Days ]: number
    },
  }
};
