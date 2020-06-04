import React, { useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from "react-helmet"
import SingleColumn from '../../layouts/SingleColumn'
import CalorieTargets from '../../domain/nutrition/CalorieTargets'
import { useDispatch, useSelector } from "react-redux"
import Divider from '@material-ui/core/Divider';
import DailyTargets from '../../domain/nutrition/DailyTargets'
import * as Yup from 'yup'
import { getCalorieRequirements, getMacroPlanStep } from "../../redux/selectors/nutrition"
import DailyCaloriesCards from '../../domain/nutrition/DailyCaloriesCards';
import { setupMacroUserDetails } from "../../redux/reducers/nutrition"
import PrintButton from '../../components/Button/PrintButton';

const useStyles = makeStyles( theme => ( {
  pageContainer: {
    minHeight: '75vh',
    // maxWidth: '980px !important',
  },
  divider: {
    height: 2,
    marginTop: 50,
    marginBottom: 40,
  },
  printSection: {
    marginTop: 40,
    marginBottom: 40,
  },
  printButtonContainer: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
  }
} ) )

const MacroGenerator = () => {
  const classes = useStyles();
  const step = useSelector( getMacroPlanStep );
  const dispatch = useDispatch();
  const calorieRequirements = useSelector( getCalorieRequirements );

  useEffect( () => {
    if ( calorieRequirements === undefined ) {
      dispatch( setupMacroUserDetails() );
    }
  } );

  return (
    <SingleColumn title="Macro Generator" className={ classes.pageContainer }>
      <Helmet>
        <meta name="description" content="Page that allows users to create a customized Calorie & Macro plan for one week"/>
        <title>Calorie & Macro Generator</title>
      </Helmet>
      <CalorieTargets />
      {
        step > 1 && (
          <Fragment>
            <Divider classes={ { root: classes.divider } } />
            <DailyTargets />
            <DailyCaloriesCards />
          </Fragment>
        )
      }

      {
        step === 3 && (
          <PrintButton />
        )
      }

    </SingleColumn>
  )
}

export default MacroGenerator;
