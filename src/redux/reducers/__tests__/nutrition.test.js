import {
  CALCULATE_CALORIE_REQUIREMENTS,
  calculateCalorieRequirements,
  CHANGE_BMR_FORMULA,
  changeBMRformula,
  createNutritionNumbers,
  nutritionReducer,
  SETUP_MACRO_USER_DETAILS,
  setupMacroUserDetails,
  CREATE_NUTRITION_NUMBERS,
  SET_MAINTENANCE_CALORIES, setMaintenanceCalories,
} from '../nutrition'


describe( 'nutrition reducer tests', () => {

  describe( `${ CALCULATE_CALORIE_REQUIREMENTS }`, () => {

    it( 'should handle computing the calorie requirements for both mifflen formula', () => {

      const previousState = {
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
      };

      const userDetails = {
        gender: 'Male',
        age: 27,
        weight: 174,
        height: {
          feet: 5,
          inches: 8,
        },
      };
      const action = calculateCalorieRequirements( userDetails );

      const expectedState = {
        userDetails: {
          gender: 'Male',
          age: 27,
          weight: 174,
          height: {
            feet: 5,
            inches: 8,
            centimeters: '',
          },
          bodyFat: '',
        },
        calorieRequirements: {
          formula: 'Mifflin-St Jeor',
          maintenance: 1988,
          lightWorkout: 2248,
          hardWorkout: 2594,
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );

    it( 'should handle computing calorie requirements with the katch bmr formula', () => {
      const previousState = {
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
          formula: 'Katch-McArdle',
        },
      };

      const details = {
        weight: 174,
        bodyFat: 14,
      };

      const action = calculateCalorieRequirements( details );

      const expectedState = {
        userDetails: {
          gender: '',
          age: '',
          weight: 174,
          height: {
            feet: '',
            inches: '',
            centimeters: '',
          },
          bodyFat: 14,
        },
        calorieRequirements: {
          formula: 'Katch-McArdle',
          maintenance: 2113,
          lightWorkout: 2388,
          hardWorkout: 2572,
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );

  } );

  describe( `${ CHANGE_BMR_FORMULA }`, () => {

    it( 'should update the formula field and remove previous calorie targets if they have been computed', () => {

      const previousState = {
        userDetails: {},
        calorieRequirements: {
          formula: 'Mifflen-St Jeor',
          maintenance: 2000,
          lightWorkout: 2100,
          hardWorkout: 2200,
        },
      };

      const action = changeBMRformula( {
        formula: 'Katch-McArdle'
      } );

      const expectedState = {
        userDetails: {},
        calorieRequirements: {
          formula: 'Katch-McArdle',
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );


  } );

  describe( `${ CREATE_NUTRITION_NUMBERS }`, () => {

    it( 'should handle creating calorie plan for Lose Weight scenario ', () => {

      const previousState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
      };

      const action = createNutritionNumbers( {
        goal: 'Lose Weight',
        dietLength: '12 Weeks',
        workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
        targetWeeklyWeightLoss: 1,
      } );

      const expectedState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Lose Weight',
          dietLength: 12,
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          targetWeeklyWeightLoss: 1,
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
          ]
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );

    it( 'should handle creating calorie plan for Maintenance scenario', () => {

      const previousState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
      };

      const action = createNutritionNumbers( {
        goal: 'Maintenance',
        workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
      } );

      const expectedState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Maintenance',
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
          ]
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState )

    } )

  } );

  describe( `${ SETUP_MACRO_USER_DETAILS }`, () => {

    it( 'should handle setting up the user macro data structure', () => {

      const action = setupMacroUserDetails();

      const expectedState = {
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
      };

      expect( nutritionReducer( {}, action ) )
        .toEqual( expectedState );

    } );

  } );

  describe( `${ SET_MAINTENANCE_CALORIES }`, () => {

    it( 'should handle overriding the maintenance calories for a Lose Weight scenario', () => {

      const previousState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Lose Weight',
          dietLength: 12,
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          targetWeeklyWeightLoss: 1,
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
          ]
        },
      };

      const action = setMaintenanceCalories( {
        day: 'Tuesday',
        label: 'hardWorkout',
      } );

      const expectedState = {
        userDetails: {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        calorieRequirements: {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Lose Weight',
          dietLength: 12,
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          targetWeeklyWeightLoss: 1,
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout' },
                { value: 'hardWorkout', label: 'Hard Workout', selected: true },
              ],
              targetCalories: 2094,
              macros: {
                protein: 183,
                carbs: 244,
                fats: 43, // 1119
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1488,
              macros: {
                protein: 192,
                carbs: 84,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 1748,
              macros: {
                protein: 183,
                carbs: 158,
                fats: 43,
              },
              override: undefined,
            },
          ]
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );

    it( 'should handle overriding the maintenance calories for a Maintenance scenario', () => {

      const previousState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Maintenance',
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
          ]
        },
      };

      const action = setMaintenanceCalories( {
        day: 'Tuesday',
        label: 'hardWorkout',
      } );

      const expectedState = {
        'userDetails': {
          'gender': 'Male',
          'age': 27,
          'weight': 174,
          'height': {
            'feet': 5,
            'inches': 8,
            'centimeters': '',
          },
          'bodyFat': '',
        },
        'calorieRequirements': {
          'formula': 'Mifflin-St Jeor',
          'maintenance': 1988,
          'lightWorkout': 2248,
          'hardWorkout': 2594,
        },
        weeklyTargets: {
          goal: 'Maintenance',
          workoutDays: [ 'Tuesday', 'Thursday', 'Saturday', 'Sunday' ],
          days: [
            {
              day: 'Monday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Tuesday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout' },
                { value: 'hardWorkout', label: 'Hard Workout', selected: true },
              ],
              targetCalories: 2594,
              macros: {
                protein: 140,
                carbs: 250,
                fats: 115,
              },
              override: undefined,
            },
            {
              day: 'Wednesday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Thursday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Friday',
              workout: false,
              calorieOptions: [
                { value: 'maintenance', label: 'Maintenance', selected: true },
              ],
              targetCalories: 1988,
              macros: {
                protein: 140,
                carbs: 159,
                fats: 88,
              },
              override: undefined,
            },
            {
              day: 'Saturday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
            {
              day: 'Sunday',
              workout: true,
              calorieOptions: [
                { value: 'lightWorkout', label: 'Light Workout', selected: true },
                { value: 'hardWorkout', label: 'Hard Workout' },
              ],
              targetCalories: 2248,
              macros: {
                protein: 140,
                carbs: 200,
                fats: 99,
              },
              override: undefined,
            },
          ]
        },
      };

      expect( nutritionReducer( previousState, action ) )
        .toEqual( expectedState );

    } );


  } );

} );
