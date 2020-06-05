import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getDialogByName } from "../../redux/selectors/dialogs"
import { closeDialog } from "../../redux/reducers/dialogs"
import NotificationSubscribeDialog from "../../components/Dialog/NotificationSubscribeDialog"
import { betaUserSubscribe } from "../../redux/reducers/webBetaUsers"



const Subscribe = ( { locationProps } ) => {
  const dispatch = useDispatch();
  const subscribeDialogState = useSelector( state => {
    return getDialogByName( state, 'subscribe' );
  } );


  const handleSubscribe = ( contactInfo: { name: string, email: string } ) => {
    let feature = '';
    if ( locationProps.location.pathname === '/nutrition' ) {
      feature = 'meal plan'
    }

    if ( locationProps.location.pathname === '/' ) {
      feature = 'workout'
    }

    dispatch( betaUserSubscribe( {
      name: contactInfo.name,
      email: contactInfo.email.toLowerCase(),
      // @ts-ignore
      featuresInterestedIn: [ feature ],
    } ) );
    dispatch( closeDialog( 'subscribe' ) );
  };


  return (
    <NotificationSubscribeDialog
      open={ subscribeDialogState }
      onClose={ () => dispatch( closeDialog( 'subscribe' ) ) }
      onSubscribe={ handleSubscribe }
    />
  );
};


type Props = {
  locationProps: any,
};

export default Subscribe;
