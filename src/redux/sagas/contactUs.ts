import { put, takeEvery, select, call, all } from 'redux-saga/effects';
import firebase from "gatsby-plugin-firebase"
import { CONTACT_US_SUBMISSION, contactUsSubmission } from "../reducers/contactUs"
import { showNotification } from "../reducers/notification"


function* submitContactMessageREST( message ) {
  const collection = firebase
    .firestore()
    .collection( 'contactUs' )

  return yield call( [ collection, collection.add ], message );
}

export function* handleContactSubmissions( action ) {
  try {
    yield call( submitContactMessageREST, action.payload );
    yield put( showNotification( {
      severity: "success",
      message: 'Successfully sent message'
    } ) );
  }
  catch ( error ) {
    yield put( showNotification( {
      severity: 'error',
      message: error.message || 'Whoops something went wrong trying to send that message, please try again later',
    } ) )
  }
}

export function* watchContactUs() {
  yield takeEvery( CONTACT_US_SUBMISSION, handleContactSubmissions );
}