import { takeEvery } from 'redux-saga/effects';
import firebase from 'gatsby-plugin-firebase'
import { LOG_GA_EVENT } from "../reducers/firebaseAnalytics"


export function LogEvent( action ) {
  firebase.analytics().logEvent(
    action.payload.eventName,
    action.payload.options || null
  );
}


export function* watchAnalyticEvent() {
  yield takeEvery( LOG_GA_EVENT, LogEvent );
}




