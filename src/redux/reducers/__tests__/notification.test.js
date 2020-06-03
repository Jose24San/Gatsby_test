import {
  CLOSE_NOTIFICATION,
  closeNotification,
  notificationReducer,
  SHOW_NOTIFICATION,
  showNotification,
} from '../notification'


describe( 'Notification reducer', () => {

  describe( `CASE: ${ SHOW_NOTIFICATION }`, () => {

    it( 'should handle setting the notification information in state', () => {

      const action = showNotification( {
        severity: 'success',
        message: 'testing notification',
        autoHide: true,
      } );

      const expectedState = {
        severity: 'success',
        message: 'testing notification',
        autoHide: true,
      };

      expect( notificationReducer( {}, action ) )
        .toEqual( expectedState );

    } );

  } );

  describe( `CASE: ${ CLOSE_NOTIFICATION } `, () => {

    it( 'should remove all notification information from state', () => {
      const previousState = {
        severity: 'Success',
        message: 'This is a test message',
      };

      const action = closeNotification();

      expect( notificationReducer( previousState, action ) )
        .toEqual( {} )

    } );

  } );

} );
