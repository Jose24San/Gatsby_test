
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';



export const closeNotification = () => ( {
  type: CLOSE_NOTIFICATION
} );

export const showNotification = ( options: {
  severity: 'error' | 'warning' | 'info' | 'success'
  message: string,
  autoHideDuration?: number,
} ) => ( {
  type: SHOW_NOTIFICATION,
  payload: options,
} )





export const notificationReducer = ( state = {}, action ) => {
  switch ( action.type ) {
    case SHOW_NOTIFICATION:
      return action.payload;

    case CLOSE_NOTIFICATION:
      return {};

    default:
      return state;
  }
};

type State = {
  severity: 'error' | 'warning' | 'info' | 'success'
  message: string,
  autoHideDuration?: number,
};