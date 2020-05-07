import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SingleColumn from '../../layouts/SingleColumn'
import CalorieTargets from '../../domain/nutrition/CalorieTargets'
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from "react-redux"
import DailyTargets from '../../domain/nutrition/DailyTargets'
import * as Yup from 'yup'
import { getCalorieRequirements, getMacroPlanStep } from "../../redux/selectors/nutrition"
import DailyCaloriesCards from '../../domain/nutrition/DailyCaloriesCards';
import { setupMacroUserDetails } from "../../redux/reducers/nutrition"

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


    </SingleColumn>
  )
}

export default MacroGenerator;
