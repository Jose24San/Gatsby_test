import React from 'react'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import configureStore from './configureStore'

const store = configureStore();

export default ( { element } ) => (
  <Provider store={ store }>
    <MuiPickersUtilsProvider utils={ MomentUtils }>
      { element }
    </MuiPickersUtilsProvider>
  </Provider>
);
