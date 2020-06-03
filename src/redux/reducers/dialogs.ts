

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';


export const openDialog = ( dialogName: string ) => ( {
  type: OPEN_DIALOG,
  payload: dialogName,
} );

export const closeDialog = ( dialogName: string ) => ( {
  type: CLOSE_DIALOG,
  payload: dialogName,
} );




export const dialogReducer = ( state = {}, action ) => {
  switch ( action.type ) {
    case OPEN_DIALOG:
      return {
        ...state,
        [ action.payload ]: true,
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        [ action.payload ]: false,
      };

    default:
      return state;
  }
};




type State = {
  [ x: string ]: boolean,
}