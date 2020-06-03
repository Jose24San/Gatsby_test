

export const getDialogs = state => state.dialogs;

export const getDialogByName = ( state, dialogName ) => {
  const dialogs = getDialogs( state );
  return ( dialogs[ dialogName ] ) ? dialogs[ dialogName ] : false;
};