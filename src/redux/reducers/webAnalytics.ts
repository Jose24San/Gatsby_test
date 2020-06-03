
export const BETA_USER_SUBSCRIBE = 'BETA_USER_SUBSCRIBE';


export const betaUserSubscribe = ( data: {
  name: string,
  email: string,
  feature: 'meal plan' | 'workout'
} ) => ( {
  type: BETA_USER_SUBSCRIBE,
  payload: data,
} );

