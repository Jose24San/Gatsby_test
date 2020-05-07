import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from './rootReducer'


const logger = createLogger( {
  duration: true,
  timestamp: false,
  diff: true,
} );


export default function configureStore() {
  const middleWare = [];

  if ( process.env.NODE_ENV !== 'production' ) {
    middleWare.push( logger )
    middleWare.push( reduxImmutableStateInvariant() );
  }

  return createStore(
    rootReducer,
    {},
    applyMiddleware( ...middleWare )
  );
}