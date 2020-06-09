import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import { Typography, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux"
import { EVENTS, logAnalyticEvent } from "../../redux/reducers/firebaseAnalytics"



const useStyles = makeStyles( theme => ( {
  printSection: {
    marginTop: 40,
    marginBottom: 40,

    '@media print': {
      display: 'none',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    cursor: 'pointer',
  },
  button: {
    fontSize: 50,
  }
} ) );

const PrintButton = ( { className }: Props ) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const print = () => {
    dispatch( logAnalyticEvent( EVENTS.PRINTING_NUTRITION_PLAN ) )
    window.print();
  }

  return (
    <div className={ classes.printSection }>
      <Divider />
      <div className={ classes.container }>
        <div className={ classes.innerContainer } onClick={ print }>
          <PrintIcon className={ `${ classes.button } ${ className }` } />
          <Typography>Print Me</Typography>
        </div>
      </div>
    </div>
  );
};

type Props = {
  className?: string,
};

export default PrintButton;
