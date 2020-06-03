import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'


const logger = createLogger( {
  duration: true,
  timestamp: false,
  diff: true,
} );

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middleWare = [];

  if ( process.env.NODE_ENV !== 'production' ) {
    middleWare.push( logger )
    middleWare.push( reduxImmutableStateInvariant( {
      ignore: [
        // for some strange reson days[0 - 7].tableData appears out of nowhere??
        'nutrition.weeklyTargets.days'
      ],
    } ) );
  }

  middleWare.push( sagaMiddleware );

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware( ...middleWare ),
  );

  sagaMiddleware.run( rootSaga );

  return store;
}
