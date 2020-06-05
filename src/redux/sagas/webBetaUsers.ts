import { put, takeEvery, select, call, all } from 'redux-saga/effects';
import { BETA_USER_SUBSCRIBE } from "../reducers/webBetaUsers"
import firebase from "gatsby-plugin-firebase"
import { showNotification } from "../reducers/notification"

export function* addUserToBetaListREST( userData: object, existingUID?: string ) {

  if ( existingUID ) {
    const collection = firebase
      .firestore()
      .collection( 'webBetaUsers' )
      .doc( existingUID );

    return yield call( [ collection, collection.set ], userData );
  }

  const collection = firebase
    .firestore()
    .collection( 'webBetaUsers' );

  return yield call( [ collection, collection.add ], userData );
}

export function* findInBetaList( email ) {
  const collection = firebase
    .firestore()
    .collection( 'webBetaUsers' )
    .where( 'email', '==', email );

  const response = yield call( [ collection, collection.get ] );
  const responseItems = [];
  response.forEach( document => {
    responseItems.push( {
      ...document.data(),
      uid: document.id,
    } )
  } );

  if ( responseItems.length === 0 ) {
    return undefined;
  }

  return responseItems[ 0 ];
}

export function* addUserToBetaList( action ) {
  try {
    const alreadySignedUp = yield call( findInBetaList, action.payload.email );
    let userData = action.payload;

    if ( alreadySignedUp ) {
      const { featuresInterestedIn, uid } = alreadySignedUp;
      const features = [
        ...action.payload.featuresInterestedIn,
        ...featuresInterestedIn,
      ]
      const uniqueFeatures = features.filter( ( item, pos ) => {
        return features.indexOf( item ) === pos;
      } );

      userData = {
        ...action.payload,
        featuresInterestedIn: uniqueFeatures,
      }
      yield call( addUserToBetaListREST, userData, uid );
    }
    else {
      yield call( addUserToBetaListREST, userData );
    }

    yield put( showNotification( {
      severity: "success",
      message: 'Successfully added to beta user list',
    } ) )
  }
  catch( error ) {
    console.warn( 'error: ', error );
    yield put( showNotification( {
      severity: 'error',
      message: error.message || 'Whoops something went wrong please try again later',
    } ) )
  }
}

export function* watchSubscribe() {
  yield takeEvery( BETA_USER_SUBSCRIBE, addUserToBetaList );
}