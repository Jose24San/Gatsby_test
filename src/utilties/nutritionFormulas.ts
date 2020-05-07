

export const poundsToKilograms = lbs => {
  return lbs / 2.204;
}

export const inchesToCentimeter = ( inches: number ) => {
  return inches * 2.54
};


export const mifflinBMR = ( options: {
  gender: 'Male' | 'Female',
  age: number,
  weight: number,
  centimeters: number,
} ) => {
  const { gender, weight, centimeters, age } = options;
  const genderAdjustment = ( gender === 'Male' )
    ? ( 5 * age ) + 5
    : ( 5 * age ) - 161
  const basalMetabolicRate = Math.round(( 10 * weight ) + ( 6.25 * centimeters ) - genderAdjustment );

  return {
    maintenance: Math.round( basalMetabolicRate * 1.15 ),
    lightWorkout: Math.round( basalMetabolicRate * 1.3 ),
    hardWorkout: Math.round( basalMetabolicRate * 1.5 ),
  }
}

export const katchBMR = ( options: {
  weight: number,
  bodyFat: number,
} ) => {
  const { weight, bodyFat } = options;
  // moves 14 to .14 and before subtracting it from 1
  const bodyFatMultiple = 1 - ( bodyFat / Math.pow( 10, 2 ) );
  const bmr = Math.round( 370 + ( ( 21.6 * bodyFatMultiple ) * weight ) );

  return {
    maintenance: Math.round( bmr * 1.15 ),
    lightWorkout: Math.round( bmr * 1.3 ),
    hardWorkout: Math.round( bmr * 1.4 ),
  };
};

export const proteinRatios = {
  min: .6,
  max: 1.2,
  maintenance: .8,
  hypocaloric: 1.1,
  hypocaloricWorkoutDay: 1.05,
};

export const fatRatios = {
  min: .25,
  max: .4,
  maintenance: .4,
  hypocaloric: .25,
  hypocaloricWorkoutDay: .25,
}

export const carbRatios = {
  min: .6,
  max: 2.5,
};