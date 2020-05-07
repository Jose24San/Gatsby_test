import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Grid, Typography, Button, Slider} from '@material-ui/core';
import Select from "../../components/Select"
import { useDispatch, useSelector } from "react-redux"
import { getUserWeight } from "../../redux/selectors/nutrition"
import MoreInfo from '../../components/Popover/MoreInfo';
import { createNutritionNumbers } from "../../redux/reducers/nutrition"
import TextField from '../../components/TextField/TextField';
import Accordion from '../../components/Accordion/Accordion';


const useStyles = makeStyles( theme => ( {
  formHeader: {
    fontSize: '2rem',
    fontWeight: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  popoverPlacement: {
    top: 9,
    right: 0,
    left: 'initial',
  },
} ) )


const DailyTargets = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [ weightChangeRange, setWeightChangeRange ] = useState('');
  const [ totalChange, setTotalChange ] = useState('');
  const [ lowWeightChange, setLowWeightChange ] = useState( 0 );
  const [ highWeightChange, setHighWeightChange ] = useState( null );
  const userWeight = useSelector( getUserWeight );
  const [ targetWeightLoss, setTargetWeightLoss ] = useState();

  const dietLossLengths = [
    '6 Weeks',
    '7 Weeks',
    '8 Weeks',
    '9 Weeks',
    '10 Weeks',
    '11 Weeks',
    '12 Weeks',
  ];

  const dietGainLengths = [
    ...dietLossLengths,
    '13 Weeks',
    '14 Weeks',
    '15 Weeks',
    '16 Weeks',
  ];

  const handleSubmit = ( { goal, dietLength, workoutDays } ) => {

    if ( goal === 'Maintenance' ) {
      dispatch( createNutritionNumbers( {
        goal,
        workoutDays,
      } ) )
    }
    else if ( goal === 'Lose Weight' ) {
      dispatch( createNutritionNumbers( {
        goal,
        dietLength,
        workoutDays,
        targetWeeklyWeightLoss: targetWeightLoss,
      } ) );
    }
  };

  const formik = useFormik( {
    initialValues: {
      goal: '',
      dietLength: '12 Weeks',
      workoutDays: [],
    },
    validationSchema: Yup.object( {
      goal: Yup.string().required( 'Required' ),
      dietLength: Yup.string().required(  'Required'),
      // workoutDays: Yup.array().required( 'Required' ),
    } ),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  } );

  let dietLengths = dietLossLengths;
  if ( formik.values.goal === 'Lose Weight' ) dietLengths = dietLossLengths
  if ( formik.values.goal === 'Gain Muscle' ) dietLengths = dietGainLengths

  const calculateWeightLossNumbers = () => {
    const { goal, dietLength } = formik.values;

    if ( goal && dietLength ) {
      const lowerRange = Math.round( userWeight / 100 * .5 * 100 ) / 100;
      const highRange = Math.round( userWeight / 100 * 1 * 100 ) / 100;
      setTargetWeightLoss( lowerRange );
      setWeightChangeRange( `${ lowerRange }lbs - ${ highRange }lbs` );
      setLowWeightChange( lowerRange );
      setHighWeightChange( highRange );

      const weeks = parseInt( dietLength.split( ' ' )[ 0 ], 10 );
      const lowerTotal = Math.round( ( lowerRange * weeks ) * 100 ) / 100;
      const higherTotal = Math.round( ( highRange * weeks ) * 100 ) / 100;
      setTotalChange( `${ lowerTotal }lbs - ${ higherTotal }lbs` );
    }
  };

  useEffect(() => {
    calculateWeightLossNumbers();
  }, [ formik.values.goal, formik.values.dietLength ] );

  useEffect( () => {
    const { goal, dietLength } = formik.values;

    if ( goal && dietLength && targetWeightLoss ) {
      const calorieLoss = targetWeightLoss * 3500;
      const workoutDays = 4;
      const nonWorkoutDays = 3;

      const dailyCaloricDeficit = calorieLoss / 7;
      console.log( 'target calorie loss: ', calorieLoss );
      console.log( 'target calorie loss per day: ', dailyCaloricDeficit );
    }


  } );


  if ( formik.values.goal === 'Maintenance' ) {
    return (
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 6 }>
          <Select
            error={ formik.errors.goal as string }
            name="goal"
            { ...formik.getFieldProps( 'goal' ) }
            options={ [
              'Lose Weight',
              'Gain Muscle',
              'Maintenance',
            ] }
            label="Goal"
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <Select
            multiple
            error={ formik.errors.workoutDays as string }
            name="workoutDays"
            { ...formik.getFieldProps( 'workoutDays' ) }
            label="Days Per Week You Workout"
            options={ [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ] }
            helpertext="Select all the days you exercise"
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 4 }>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={ formik.handleSubmit }
          >
            Generate Macro Meal Plan
          </Button>
        </Grid>
      </Grid>
    );
  }


  return (
    <Fragment>
      <Typography variant="h2" className={ classes.formHeader }>
        Daily Targets
      </Typography>

      <Grid container spacing={ 3 }>

        <Grid item xs={ 12 } sm={ 6 }>
          <Select
            error={ formik.errors.goal as string }
            name="goal"
            { ...formik.getFieldProps( 'goal' ) }
            options={ [
              'Lose Weight',
              'Gain Muscle',
              'Maintenance',
            ] }
            label="Goal"
          />
        </Grid>

        {
          formik.values.goal !== 'Maintenance' && (
            <Fragment>
              <Grid item xs={ 12 } sm={ 6 }>
                <Select
                  error={ formik.errors.dietLength as string }
                  name="Diet Length"
                  { ...formik.getFieldProps( 'dietLength' ) }
                  options={ dietLengths }
                  label="Diet Length"
                />
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <TextField
                  info={ [
                    'Why do we have a recommended weight loss range? Well if we do not lose enough weight then it will be difficult to tell if we are making progress week to week and that will usually leads to discouragement which usually ends with quitting the diet early. If we lose too much weight then the diet becomes much more difficult to follow consistently due to hunger and if you are too hungry then you are more likely to cheat on your diet and end up destroying any results you have made.',
                    'We are searching for that middle ground where we can lose a good amount of weight on a weekly basis without having to go to extreme dieting for the sake of speed. Slow and steady wins the race in the game of weight loss.'
                  ] }
                  infoStyles={ classes.popoverPlacement }
                  fullWidth
                  variant="filled"
                  label="Recommended Weight Loss Per Week"
                  value={ weightChangeRange }
                />
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <TextField
                  info="This is the potential weight loss you could lose over the course of the diet if you stick to the plan. It is possible to lose more or less weight then shown here but that depends on how close our estimated calories are for your specific body and how good we are about making adjustments through the diet."
                  infoStyles={ classes.popoverPlacement }
                  fullWidth
                  variant="filled"
                  label="Total Potential Weight Loss"
                  value={ totalChange }
                />
              </Grid>

              <Grid item xs={ 12 }>
                <Select
                  multiple
                  error={ formik.errors.workoutDays as string }
                  name="workoutDays"
                  { ...formik.getFieldProps( 'workoutDays' ) }
                  label="Days Per Week You Workout"
                  options={ [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ] }
                  helpertext="Select all the days you exercise"
                />
              </Grid>

              {
                lowWeightChange !== 0 && (
                  <Grid item xs={ 12 }>
                    <Typography>Weight Loss Per Week</Typography>
                    <Slider
                      value={ targetWeightLoss }
                      valueLabelDisplay="on"
                      onChange={ ( evt, value ) => setTargetWeightLoss( value ) }
                      getAriaValueText={ ( value, index ) => `${ value }` }
                      step={ 0.1 }
                      min={ lowWeightChange }
                      max={ highWeightChange }
                    />
                  </Grid>
                )
              }
            </Fragment>
          )
        }

        <Grid item xs={ 12 } sm={ 4 }>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={ formik.handleSubmit }
          >
            Generate Macro Meal Plan
          </Button>
        </Grid>

      </Grid>

    </Fragment>
  );
}

export default DailyTargets;
