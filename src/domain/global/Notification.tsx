import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from "react-redux"
import { getNotification } from "../../redux/selectors/notification"
import { closeNotification } from "../../redux/reducers/notification"

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector( getNotification );
  const isOpen = Object.keys( notification ).length > 0;
  const { message, severity, autoHideDuration } = notification;

  return (
    <Snackbar
      anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
      open={ isOpen }
      autoHideDuration={ autoHideDuration || 5000 }
      onClose={ () => dispatch( closeNotification() ) }
      key={ 'notify' }
    >
      <Alert severity={ severity }>
        { message }
      </Alert>
    </Snackbar>
  );
};

export default Notification;
