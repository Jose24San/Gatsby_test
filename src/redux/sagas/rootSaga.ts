import { all, fork } from 'redux-saga/effects';
import { watchSubscribe } from "./webBetaUsers"
import { watchContactUs } from "./contactUs"
import { watchAnalyticEvent } from "./firebaseAnalytics"


export default function* rootSaga() {
  yield all ( [
    fork( watchAnalyticEvent ),
    fork( watchContactUs ),
    fork( watchSubscribe ),
  ] );
}