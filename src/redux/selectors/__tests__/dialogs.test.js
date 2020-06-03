import { getDialogByName, getDialogs } from '../dialogs'


describe( 'Dialogs selectors', () => {


  describe( 'getDialogs', () => {

    it( 'should return the dialogs reducer', () => {
      const mockState = {
        dialogs: {
          someName: false,
        }
      };

      expect( getDialogs( mockState ) )
        .toEqual( { someName: false } );

    } );

  } );

  describe( 'getDialogByName', () => {

    it( 'should return the boolean stored for a particular dialog', () => {

      const mockState = {
        dialogs: {
          nutritionMenu: true,
        },
      };

      expect( getDialogByName( mockState, 'nutritionMenu' ) )
        .toEqual( true );

    } );

  } );



} );