import {
  getBMRformula,
  getCalorieRequirements, getDailyCaloriesForWeek, getMacroNumbers,
  getMacroPlanStep,
  getNutrition, getNutritionGoal,
  getTableCalorieRequirements, getUserWeight,
} from '../nutrition'


describe( 'nutrition selector', () => {

  describe( 'getNutrition', () => {
    it( 'should return nutrition slice of state', () => {

      const mockState = {
        nutrition: {
          notEmpty: true,
        }
      };

      expect( getNutrition( mockState ) )
        .toEqual( {
          notEmpty: true,
        } )

    } );
  } );

  describe( 'getNutritionGoal', () => {

    it( 'should return the users nutrition goal', () => {

      const mockState = {
        nutrition: {
          weeklyTargets: {
            goal: 'Gain Weight',
          }
        },
      };

      expect( getNutritionGoal( mockState ) )
        .toEqual( 'Gain Weight' );

    } );

    it( 'should return maintenance if no goal exists', () => {

      const mockState = {
        nutrition: {
        },
      };

      expect( getNutritionGoal( mockState ) )
        .toEqual( 'Maintenance' );

    } );

  } );

  describe( 'getBMRformula', () => {

    it( 'should return the BRM formula currently selected', () => {

      const mockState = {
        nutrition: {
          calorieRequirements: {
            formula: 'Mifflin-St Jeor',
          },
        },
      };

      expect( getBMRformula( mockState ) )
        .toEqual( 'Mifflin-St Jeor' );

    } );

    it( 'should return a default value if calorie requirements has not been created yet', () => {


      const mockState = {
        nutrition: {},
      };

      expect( getBMRformula( mockState ) )
        .toEqual( 'Mifflin-St Jeor' );

    } );



  } );

  describe( 'getCalorieRequirements', () => {

    it( 'should return calorie requirements', () => {

      const mockState = {
        nutrition: {
          calorieRequirements: {
            formula: '',
            maintenance: 1900,
            lightWorkout: 2000,
            hardWorkout: 2100,
          }
        },
      };

      const expected = {
        formula: '',
        maintenance: 1900,
        lightWorkout: 2000,
        hardWorkout: 2100,
      };

      expect( getCalorieRequirements( mockState ) )
        .toEqual( expected );

    } );

  } );

  describe( 'getDailyCaloriesForWeek', () => {

    it( 'should handle returning the daily calorie information for macro meal plan cards', () => {

      const mockState = {
        nutrition: {
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
          'weeklyTargets': {
            'goal': 'Lose Weight',
            'dietLength': 12,
            'workoutDays': [
              'Tuesday',
              'Thursday',
              'Saturday',
              'Sunday',
            ],
            'targetWeeklyWeightLoss': 1,
            days: [
              {
                day: 'Monday',
                workout: false,
                calorieOptions: [
                  { value: 'maintenance', label: 'Maintenance', selected: true },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1488,
                override: undefined,
              },
              {
                day: 'Tuesday',
                workout: true,
                calorieOptions: [
                  { value: 'lightWorkout', label: 'Light Workout', selected: true },
                  { value: 'hardWorkout', label: 'Hard Workout' },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1748,
                override: undefined,
              },
              {
                day: 'Wednesday',
                workout: false,
                calorieOptions: [
                  { value: 'maintenance', label: 'Maintenance', selected: true },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1488,
                override: undefined,
              },
              {
                day: 'Thursday',
                workout: true,
                calorieOptions: [
                  { value: 'lightWorkout', label: 'Light Workout', selected: true },
                  { value: 'hardWorkout', label: 'Hard Workout' },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1748,
                override: undefined,
              },
              {
                day: 'Friday',
                workout: false,
                calorieOptions: [
                  { value: 'maintenance', label: 'Maintenance', selected: true },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1488,
                override: undefined,
              },
              {
                day: 'Saturday',
                workout: true,
                calorieOptions: [
                  { value: 'lightWorkout', label: 'Light Workout', selected: true },
                  { value: 'hardWorkout', label: 'Hard Workout' },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1748,
                override: undefined,
              },
              {
                day: 'Sunday',
                workout: true,
                calorieOptions: [
                  { value: 'lightWorkout', label: 'Light Workout', selected: true },
                  { value: 'hardWorkout', label: 'Hard Workout' },
                  { value: 'custom', label: 'Custom' },
                ],
                targetCalories: 1748,
                override: undefined,
              },
            ],
          },
        },
      };

      const expected = [
        {
          day: 'Monday',
          workout: false,
          calorieOptions: [
            { value: 'maintenance', label: 'Maintenance', selected: true },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1488,
          override: undefined,
        },
        {
          day: 'Tuesday',
          workout: true,
          calorieOptions: [
            { value: 'lightWorkout', label: 'Light Workout', selected: true },
            { value: 'hardWorkout', label: 'Hard Workout' },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1748,
          override: undefined,
        },
        {
          day: 'Wednesday',
          workout: false,
          calorieOptions: [
            { value: 'maintenance', label: 'Maintenance', selected: true },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1488,
          override: undefined,
        },
        {
          day: 'Thursday',
          workout: true,
          calorieOptions: [
            { value: 'lightWorkout', label: 'Light Workout', selected: true },
            { value: 'hardWorkout', label: 'Hard Workout' },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1748,
          override: undefined,
        },
        {
          day: 'Friday',
          workout: false,
          calorieOptions: [
            { value: 'maintenance', label: 'Maintenance', selected: true },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1488,
          override: undefined,
        },
        {
          day: 'Saturday',
          workout: true,
          calorieOptions: [
            { value: 'lightWorkout', label: 'Light Workout', selected: true },
            { value: 'hardWorkout', label: 'Hard Workout' },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1748,
          override: undefined,
        },
        {
          day: 'Sunday',
          workout: true,
          calorieOptions: [
            { value: 'lightWorkout', label: 'Light Workout', selected: true },
            { value: 'hardWorkout', label: 'Hard Workout' },
            { value: 'custom', label: 'Custom' },
          ],
          targetCalories: 1748,
          override: undefined,
        },
      ]

      expect( getDailyCaloriesForWeek( mockState ) )
        .toEqual( expected );

    } );

    it( 'should return an empty array is the user has not filled out all the necessary Weekly target information', () => {

      const mockState = {
        nutrition: {
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
        },
      };

      expect( getDailyCaloriesForWeek( mockState ) )
        .toEqual( [] );

    } );

  } );

  describe( 'getMacroPlanStep', () => {

    it( 'should return 1 for the step', () => {

      const mockState = {
        nutrition: {
          userDetails: {},
          calorieRequirements: {
            formula: 'Mifflin-St Jeor',
          },
        }
      };

      expect( getMacroPlanStep( mockState ) )
        .toEqual( 1 );

    } );

    it( 'should return the current step the user is on in their macro plan step', () => {

      const mockState = {
        nutrition: {
          calorieRequirements: {
            formula: 'Mifflin-St Jeor',
            maintenance: 1900,
            lightWorkout: 2000,
            hardWorkout: 2100,
          }
        },
      };

      const expected = 2;

      expect( getMacroPlanStep( mockState ) )
        .toEqual( expected );

    } );

    it( 'should return step 3 if the user has created a macro meal plan', () => {

      const mockState = {
        nutrition: {
          userDetails: { notEmpty: true },
          calorieRequirements: {
            formula: 'Mifflin-St Jeor',
            maintenance: 1900,
            lightWorkout: 2000,
            hardWorkout: 2100,
          },
          weeklyTargets: {
            dietLength: 12,
            days: [ { notEmpty: true } ],
            goal: 'Lose Weight',
            targetWeeklyWeightChange: .87,
            workoutDays: [],
          },
        },
      };


      expect( getMacroPlanStep( mockState ) )
        .toEqual( 3 );

    } );

  } );

  describe( 'getMacroNumbers', () => {

    it( 'should handle Losing Weight - nonWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 1488,
        day: 'nonWorkout',
        goal: 'Lose Weight',
      };

      const expected = {
        protein: 192,
        carbs: 84,
        fats: 43,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected );
    } );

    it( 'should handle Losing Weight - lightWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 1813,
        day: 'lightWorkout',
        goal: 'Lose Weight',
      };

      const expected = {
        protein: 183,
        carbs: 174,
        fats: 43,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Losing Weight - hardWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2159,
        day: 'hardWorkout',
        goal: 'Lose Weight',
      };

      const expected = {
        protein: 183,
        carbs: 260,
        fats: 43,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )
    } );

    it( 'should handle Maintenance - nonWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 1988,
        day: 'nonWorkout',
        goal: 'Maintenance',
      };

      const expected = {
        protein: 140,
        carbs: 162,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Maintenance - lightWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2248,
        day: 'lightWorkout',
        goal: 'Maintenance',
      };

      const expected = {
        protein: 140,
        carbs: 227,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Maintenance - hardWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2594,
        day: 'hardWorkout',
        goal: 'Maintenance',
      };

      const expected = {
        protein: 140,
        carbs: 313,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Gain Weight - nonWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2208,
        day: 'nonWorkout',
        goal: 'Gain Weight',
      };

      const expected = {
        protein: 174,
        carbs: 183,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Gain Weight - lightWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2468,
        day: 'lightWorkout',
        goal: 'Gain Weight',
      };

      const expected = {
        protein: 174,
        carbs: 248,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

    it( 'should handle Gain Weight - hardWorkout day', () => {
      const options = {
        userWeight: 174,
        calories: 2814,
        day: 'hardWorkout',
        goal: 'Gain Weight',
      };

      const expected = {
        protein: 174,
        carbs: 334,
        fats: 87,
      };

      expect( getMacroNumbers( options ) )
        .toEqual( expected )

    } );

  } );

  describe( 'getTableCalorieRequirements', () => {

    it( 'should handle returning calorie requirements in a format that the table component can read', () => {

      const mockState = {
        nutrition: {
          userDetails: {
            gender: 'Male',
            age: 27,
            weight: 174,
            height: {
              feet: 5,
              inches: 8,
            },
          },
          calorieRequirements: {
            formula: 'Mifflen-St Jeor',
            maintenance: 1900,
            lightWorkout: 2000,
            hardWorkout: 2100,
          },
        },
      };

      const expected = [
        {
          day: 'Maintenance',
          calories: 1900,
        },
        {
          day: 'Light Workout',
          calories: 2000,
        },
        {
          day: 'Hard Workout',
          calories: 2100,
        }
      ];

      expect( getTableCalorieRequirements( mockState ) )
        .toEqual( expected );

    } );

    it( 'should handle scenario where there are no calorie number computed yet', () => {

      const mockState = {
        nutrition: {
          userDetails: {
            gender: 'Male',
            age: 27,
            weight: 174,
            height: {
              feet: 5,
              inches: 8,
            },
          },
          calorieRequirements: {
            formula: 'Mifflen-St Jeor',
          },
        },
      };

      expect( getTableCalorieRequirements( mockState ) )
        .toEqual( undefined );
    } );

  } );

  describe( 'getUserWeight', () => {

    it( 'should return the weight of the user', () => {

      const mockState = {
        nutrition: {
          userDetails: {
            weight: 174
          },
        }
      };

      expect( getUserWeight( mockState ) )
        .toEqual( 174 );

    } );

  } );

} );
