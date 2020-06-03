import { all, fork } from 'redux-saga/effects';
import { watchSubscribe } from "./webAnalytics"
import { watchContactUs } from "./contactUs"


export default function* rootSaga() {
  yield all ( [
    fork( watchContactUs ),
    fork( watchSubscribe ),
  ] );
}