import { getNotification } from '../notification'


describe( 'notification selectors', () => {

  it( 'should return the notification state', () => {

    const mockState = {
      notification: {
        severity: 'success'
      },
    };

    expect( getNotification( mockState ) )
      .toEqual( { severity: 'success' } );

  } );

} );