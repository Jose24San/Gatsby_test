import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from '../../components/Select/Select'
import { TextField, Grid, Typography, Button, InputLabel } from '@material-ui/core';
import MaterialTable from 'material-table';
import MoreInfo from '../../components/Popover/MoreInfo'
import Accordion from '../../components/Accordion/Accordion'
import { useDispatch, useSelector } from 'react-redux'
import { calculateCalorieRequirements, changeBMRformula } from '../../redux/reducers/nutrition'
import { getBMRformula, getTableCalorieRequirements } from '../../redux/selectors/nutrition'
import Table from '../../components/Table/Table';
import { EVENTS, logAnalyticEvent } from "../../redux/reducers/firebaseAnalytics"

const useStyles = makeStyles( theme => ( {
  container: {
    // '@media print': {
    //   display: 'none',
    // },
  },
  textField: {
    width: '100%',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,

    [ theme.breakpoints.up( 'md' ) ]: {
      marginTop: -70,
    },
  },
  heightLabel: {
    marginTop: 10,
    marginBottom: -15,
  },
  formHeader: {
    fontSize: '2rem',
    fontWeight: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  settingCardContainer: {
    boxShadow: 'none',
  },
  settingsContainer: {
    [ theme.breakpoints.up( 'sm' ) ]: {
      width: '50%',
    },
  },
  tableDescription: {
    marginBottom: 10,
  },
  tablePopover: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  popover: {
    marginTop: 2,
    position: 'absolute',
    zIndex: 100,
  },
  infoIcon: {
    fontSize: 30,
  },
} ) )


const activities = {
  NO_ACTIVITY: 'No Activity - No Active Exercise',
  LIGHT_ACTIVITY: 'Lightly Active - 1 to 3 hours of exercise a week',
  MODERATE_ACTIVITY: 'Moderately Active - 4 to 6 hours of exercise a week',
  HIGH_ACTIVITY: 'Very Active - 7 to 9 hours of exercise a week',
}

const maintenance = 'Maintenance calories are the estimated calories needed for you to maintain your body weight without accounting for any exercise.';

const lightWorkout = 'Light workout calories are the estimated calories needed for you to maintain your body weight on the days you are working out and burning around 250 calories during your workout.';

const hardWorkout = 'Hard workout calories are the estimated calories needed for you to maintain your body weight on the days you are working out and burning around 500 calories during your workout';

const extraTip = 'If you are unsure if you need light workout or hard workout calories for a specific workout day then err on the side of caution and go with light workout calories until you can see weight changing over the weeks to confirm whether you need more or less calories.'

const CalorieTargets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const calorieRequirements = useSelector( getTableCalorieRequirements );
  const bmrFormula = useSelector( getBMRformula );

  const calculateMacros = values => {
    const { gender, age, weight, feet, inches, bodyFat } = values;

    if ( bmrFormula === 'Mifflin-St Jeor' ) {
      dispatch( calculateCalorieRequirements( {
        gender,
        age,
        weight,
        height: {
          feet,
          inches,
        },
      } ) );
    }

    if ( bmrFormula === 'Katch-McArdle' ) {
      dispatch( calculateCalorieRequirements( {
        weight,
        bodyFat
      } ) );
    }

    if ( gender === 'Male' ) {
      dispatch( logAnalyticEvent( EVENTS.NUTRITION_PLAN_FOR_MALE ) )
    }
    else if ( gender === 'Female' ) {
      dispatch( logAnalyticEvent( EVENTS.NUTRITION_PLAN_FOR_FEMALE ) )
    }
    dispatch( logAnalyticEvent( EVENTS.CREATED_CALORIE_TARGETS_1 ) )
  };

  const mifflenFormik = useFormik( {
    initialValues: {
      gender: 'Male',
      age: 27,
      weight: 175,
      activityLevel: '',
      goal: '',
      feet: 5,
      inches: 8,
    },
    validationSchema: Yup.object( {
      gender: Yup.string().required( 'Required' ),
      age: Yup.number().required( 'Required' ),
      weight: Yup.number().required( 'Required' ),
      feet: Yup.number().required( 'Required' ),
      inches: Yup.number().required( 'Required' ),
    } ),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: calculateMacros,
  } );

  const katchFormik = useFormik( {
    initialValues: {
      weight: '',
      bodyFat: '',
    },
    validationSchema: Yup.object( {
      bodyFat: Yup.number().required( 'Required' ),
      weight: Yup.number().required( 'Required' ),
    } ),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: calculateMacros,
  } );

  const handleSubmit = () => {
    if ( bmrFormula === 'Mifflin-St Jeor' ) {
      mifflenFormik.handleSubmit()
    }
    if ( bmrFormula === 'Katch-McArdle' ) {
      katchFormik.handleSubmit()
    }
  };

  const mifflenForm = () => (
    <Fragment>
      <Grid item xs={ 12 }>
        <Select
          // @ts-ignore
          error={ mifflenFormik.errors.gender }
          name="gender"
          { ...mifflenFormik.getFieldProps( 'gender' ) }
          options={ [ 'Male', 'Female' ] }
          label="Gender"
        />
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          error={ Boolean( mifflenFormik.errors.age ) }
          helperText="Required"
          type="number"
          className={ classes.textField }
          label="Age"
          name="age"
          { ...mifflenFormik.getFieldProps( 'age' ) }
        />
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          error={ Boolean( mifflenFormik.errors.weight ) }
          helperText="Required"
          className={ classes.textField }
          label="Weight"
          name="weight"
          type="number"
          { ...mifflenFormik.getFieldProps( 'weight' ) }
        />
      </Grid>

      <Grid item xs={ 12 } className={ classes.heightLabel }>
        <InputLabel>Height</InputLabel>
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          error={ Boolean( mifflenFormik.errors.feet ) }
          helperText="Required"
          className={ classes.textField }
          label="Feet"
          name="feet"
          type="number"
          { ...mifflenFormik.getFieldProps( 'feet' ) }
        />
      </Grid>

      <Grid item xs={ 12 } sm={ 6 }>
        <TextField
          error={ Boolean( mifflenFormik.errors.inches ) }
          helperText="Required"
          className={ classes.textField }
          label="Inches"
          name="inches"
          type="number"
          { ...mifflenFormik.getFieldProps( 'inches' ) }
        />
      </Grid>
    </Fragment>
  )

  const katchForm = () => (
    <Fragment>
      <Grid item xs={ 6 }>
        <TextField
          error={ Boolean( katchFormik.errors.weight ) }
          helperText="Required"
          type="number"
          className={ classes.textField }
          label="Weight"
          name="weight"
          { ...katchFormik.getFieldProps( 'weight' ) }
        />
      </Grid>

      <Grid item xs={ 6 }>
        <TextField
          error={ Boolean( katchFormik.errors.bodyFat ) }
          helperText="Required"
          type="number"
          className={ classes.textField }
          label="Body Fat%"
          name="bodyFat"
          { ...katchFormik.getFieldProps( 'bodyFat' ) }
        />
      </Grid>
    </Fragment>
  )


  return (
    <div className={ classes.container }>
      <Typography className={ classes.formHeader } variant="h2">
        Calorie Targets
      </Typography>


      <Grid container spacing={ 3 }>
        {
          bmrFormula === 'Mifflin-St Jeor'
            ? mifflenForm()
            : katchForm()
        }


        <Grid container justify="flex-end">
          <Accordion
            cardStyle={ classes.settingCardContainer }
            containerStyle={ `${ classes.settingsContainer } hide-in-print` }
            data={ [
              {
                title: 'Advanced Settings',
                content: (
                  <Select
                    value={ bmrFormula }
                    onChange={ evt => {
                      dispatch( changeBMRformula( {
                        formula: evt.target.value
                      } ) )
                    } }
                    label="Basal Metabolic Rate Formula"
                    options={ [ 'Mifflin-St Jeor', 'Katch-McArdle' ] }
                  />
                )
              }
            ] }
          />
        </Grid>


        <Grid item xs={ 12 } sm={ 4 } className="hide-in-print">
          <Button
            className={ classes.button }
            variant="contained"
            color="secondary"
            onClick={ handleSubmit }
          >
            Calculate Calorie Targets
          </Button>
        </Grid>

        {
          calorieRequirements && (
            <Grid item xs={ 12 }>
              <Table
                descriptionText={ [ maintenance, lightWorkout, hardWorkout, extraTip ] }
                columns={ [
                  {
                    title: 'Day',
                    field: 'day',
                    cellStyle: { paddingLeft: 20 },
                    headerStyle: { paddingLeft: 20 },
                  },
                  { title: 'Calories', field: 'calories' }
                ] }
                data={ calorieRequirements }
              />
            </Grid>
          )
        }

      </Grid>
    </div>
  );
};

export default CalorieTargets;
