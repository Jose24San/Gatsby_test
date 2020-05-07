import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, Tooltip } from "@material-ui/core"
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import Switch from '../../components/Switch/Switch';
import { useDispatch, useSelector } from "react-redux"
import { getDailyCaloriesForWeek } from "../../redux/selectors/nutrition"
import TextField from '../../components/TextField/TextField';
import { setMaintenanceCalories } from "../../redux/reducers/nutrition"
import Table from "../../components/Table/Table";

const useStyles = makeStyles( theme => ( {
  container: {
    marginTop: 40,
  },
  cardContainer: {
    padding: 20,
    minHeight: 305
  },
  formHeader: {
    fontSize: '2rem',
    fontWeight: 400,
    marginBottom: 20,
  },
  totalsIcon: {
    marginLeft: 10,
    marginRight: 10,

    [ theme.breakpoints.up( 'sm' ) ]: {
      marginRight: 30,
      marginLeft: 30,
    },
  },
  radioContainer: {
    height: 100,
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 40,
  },
} ) );


const DailyCaloriesCards = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const calorieInformation = useSelector( getDailyCaloriesForWeek );

  const handleCalorieSelection = ( day, label ) => {
    dispatch( setMaintenanceCalories( { day, label } ) );
  };

  console.log( 'calorie information: ', calorieInformation );

  return (
    <div className={ classes.container }>
      <Grid container spacing={ 3 }>
        {
          calorieInformation.map( item => (
            <Grid item xs={ 12 } sm={ 6 } key={ item.day }>
              <Paper className={ classes.cardContainer } elevation={ 3 }>


                <Grid container justify="space-between">
                  <Typography className={ classes.formHeader } variant="h2">
                    { item.day }
                  </Typography>
                  <Tooltip
                    title="Updated by 'Days Per Week You Workout' select"
                    placement="top-start"
                  >
                    <div>
                      <Switch
                        checked={ item.workout }
                        label="Workout Day"
                      />
                    </div>
                  </Tooltip>
                </Grid>

                <div className={ classes.radioContainer }>
                  <RadioButtons
                    explanation="These are the calories needed for this day based on the activity you plan on having in order to maintain your weight"
                    title="Maintenance Calories"
                    onChange={ value => {
                      handleCalorieSelection( item.day, value );
                    } }
                    options={ item.calorieOptions }
                  />
                </div>


                <TextField
                  info="We take your expected energy expenditure for this day and remove the calories needed to come up with your calorie target to hit your weekly weight loss goal"
                  fullWidth
                  variant="filled"
                  label="Target Calories"
                  value={ item.targetCalories }
                />


                <Table
                  descriptionText="Macros needed for this day"
                  columns={ [
                    {
                      title: 'Protein',
                      field: 'protein',
                      cellStyle: { paddingLeft: 25 },
                      headerStyle: { paddingLeft: 25 },
                    },
                    { title: 'Carbs', field: 'carbs' },
                    { title: 'Fats', field: 'fats' },
                  ] }
                  containerClassName={ classes.tableContainer }
                  data={ [ item.macros ] }
                />

              </Paper>
            </Grid>
          ) )
        }
      </Grid>
    </div>
  )
};

export default DailyCaloriesCards;
