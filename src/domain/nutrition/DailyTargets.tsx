import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from "formik"
import * as Yup from 'yup';
import { Grid, Typography, Button, Slider} from '@material-ui/core';
import Select from "../../components/Select/Select"
import { useDispatch, useSelector } from "react-redux"
import { getUserWeight } from "../../redux/selectors/nutrition"
import { createNutritionNumbers } from "../../redux/reducers/nutrition"
import TextField from '../../components/TextField/TextField';
import { EVENTS, logAnalyticEvent } from "../../redux/reducers/firebaseAnalytics"


const useStyles = makeStyles( theme => ( {
  container: {
    '@media print': {
      marginBottom: 75,
    },
  },
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
  const [ targetWeightChange, setTargetWeightChange ] = useState();

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
      dispatch( logAnalyticEvent( EVENTS.CREATED_NUTRITION_PLAN_FOR_MAINTENANCE ) );
      dispatch( createNutritionNumbers( {
        goal,
        workoutDays,
      } ) )
    }
    else if ( goal === 'Lose Weight' || goal === 'Gain Weight' ) {
      if ( goal === 'Lose Weight' ) {
        dispatch( logAnalyticEvent( EVENTS.CREATED_NUTRITION_PLAN_FOR_LOSING_WEIGHT ) );
      }
      else if ( goal === 'Gain Weight' ) {
        dispatch( logAnalyticEvent( EVENTS.CREATED_NUTRITION_PLAN_FOR_GAINING_WEIGHT ) );
      }

      dispatch( createNutritionNumbers( {
        goal,
        dietLength,
        workoutDays,
        targetWeeklyWeightChange: targetWeightChange,
      } ) );
    }
    dispatch( logAnalyticEvent( EVENTS.CREATED_MACRO_PLAN_2 ) );
  };

  const formik = useFormik( {
    initialValues: {
      goal: '',
      dietLength: '',
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
  if ( formik.values.goal === 'Gain Weight' ) dietLengths = dietGainLengths

  const calculateWeightChangeNumbers = () => {
    const { goal, dietLength } = formik.values;

    if ( goal && dietLength ) {
      let lowerRange;
      let highRange;
      if ( goal === 'Lose Weight' ) {
        lowerRange = Math.round( userWeight / 100 * .5 * 100 ) / 100;
        highRange = Math.round( userWeight / 100 * 1 * 100 ) / 100;
      }
      else if ( goal === 'Gain Weight' ) {
        lowerRange = Math.round( userWeight / 100 * .25 * 100 ) / 100;
        highRange = Math.round( userWeight / 100 * .5 * 100 ) / 100;
      }

      setTargetWeightChange( lowerRange );
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
    calculateWeightChangeNumbers();
  }, [ formik.values.goal, formik.values.dietLength ] );

  useEffect( () => {
    const { goal, dietLength } = formik.values;

    if ( goal && dietLength && targetWeightChange ) {
      const calorieLoss = targetWeightChange * 3500;
      const workoutDays = 4;
      const nonWorkoutDays = 3;

      const dailyCaloricDeficit = calorieLoss / 7;
      console.log( 'target calorie loss: ', calorieLoss );
      console.log( 'target calorie loss per day: ', dailyCaloricDeficit );
    }

  } );

  const renderMaintenanceForm = () => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };

  const renderMuscleGainForm = () => {
    return (
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
              'Why do we have a recommended weight gain range? You need to gain enough weight that muscle gains are able to be seen visually or on a scale but not so much weight that you start gaining more fat then is necessary.'
            ] }
            infoStyles={ classes.popoverPlacement }
            fullWidth
            variant="filled"
            label="Recommended Weight Gain Per Week"
            value={ weightChangeRange }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <TextField
            info="This is the potential weight you could gain over the course of the diet if you stick to the plan. It is possible to gain more or less weight then shown here but that depends on how close our estimated calories are for your specific body and how good you are about making adjustments week by week through the diet based on how your body changes and adapts."
            infoStyles={ classes.popoverPlacement }
            fullWidth
            variant="filled"
            label="Total Potential Weight Gain"
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
              <Typography>Weight Gain Per Week</Typography>
              <Slider
                value={ targetWeightChange }
                valueLabelDisplay="on"
                onChange={ ( evt, value ) => setTargetWeightChange( value ) }
                getAriaValueText={ ( value, index ) => `${ value }` }
                step={ 0.1 }
                min={ lowWeightChange }
                max={ highWeightChange }
              />
            </Grid>
          )
        }
      </Fragment>
    );
  };

  const renderWeightLossForm = () => {
    return (
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
            info="This is the potential weight loss you could lose over the course of the diet if you stick to the plan. It is possible to lose more or less weight then shown here but that depends on how close our estimated calories are for your specific body and how good you are about making adjustments week by week through the diet based on how your body changes and adapts."
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
                value={ targetWeightChange }
                valueLabelDisplay="on"
                onChange={ ( evt, value ) => setTargetWeightChange( value ) }
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
  };

  return (
    <div className={ classes.container }>
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
              'Gain Weight',
              'Maintenance',
            ] }
            label="Goal"
          />
        </Grid>

        {
          formik.values.goal === 'Lose Weight' && (
            renderWeightLossForm()
          )
        }

        {
          formik.values.goal === 'Maintenance' && (
            renderMaintenanceForm()
          )
        }

        {
          formik.values.goal === 'Gain Weight' && (
            renderMuscleGainForm()
          )
        }

        <Grid item xs={ 12 } sm={ 4 } className="hide-in-print">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={ () => formik.handleSubmit() }
          >
            Generate Macro Meal Plan
          </Button>
        </Grid>

      </Grid>

    </div>
  );
}

export default DailyTargets;
