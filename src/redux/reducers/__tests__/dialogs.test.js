import { CLOSE_DIALOG, closeDialog, dialogReducer, OPEN_DIALOG, openDialog } from '../dialogs'


describe( 'Dialog reducer functionality', () => {

  describe( `CASE: ${ OPEN_DIALOG }`, () => {
    it( 'should handle setting open state of a dialog', () => {
      const action = openDialog( 'buildSaveCancel' );
      const expectedState = {
        buildSaveCancel: true,
      };

      expect( dialogReducer( {}, action ) )
        .toEqual( expectedState );
    } );
  } );

  describe( `CASE: ${ CLOSE_DIALOG }`, () => {
    it( 'should handle setting close state of a dialog', () => {
      const action = closeDialog( 'buildSaveCancel' );
      const previousState = {
        buildSaveCancel: true,
      };
      const expectedState = {
        buildSaveCancel: false,
      };

      expect( dialogReducer( previousState, action ) )
        .toEqual( expectedState );
    } );
  } );

} );
