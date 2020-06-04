import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SingleColumn from '../layouts/SingleColumn'
import SpoonForkImage from '../images/SpoonForkImage'
import NutritionCard from '../components/Cards/NutritionCard'
import { useDispatch } from 'react-redux'
import Paper from '../images/Paper'
import { openDialog } from '../redux/reducers/dialogs'

const useStyles = makeStyles( theme => ( {
  cardContainer: {
    marginTop: 40,
  },
  iconContainerStyle: {
    width: 70,
  },
} ) )

const Nutrition = () => {
  const classes = useStyles()
  const dispatch = useDispatch();

  return (
    <SingleColumn title="Nutrition" containerStyle={ { minHeight: '80vh' } }>
      <Grid container spacing={ 4 }>
        <Grid className={ classes.cardContainer } item xs={ 12 }>
          <NutritionCard
            title="Macro & Calorie Meal Plan - Free"
            description={ [
              'Calorie Calculations for gaining, maintaining and losing weight',
              'Guided approach for reaching goals with best practices in mind',
              'Calorie and Macronutrient break down by day'
            ] }
            iconImage={ <SpoonForkImage/> }
            link="nutrition/macroGenerator"
          />
        </Grid>

        <Grid className={ classes.cardContainer } item xs={ 12 }>
          <NutritionCard
            title="Fitomation Meal Plan - $19.99"
            description={ [
              'Custom made meal plan that spans 6-16 weeks depending on goal',
              'Calorie and Macros broken down by day',
              'Meal number and sizes breakdown based on activity level for each day',
              'Auto adjusting via the custom account section to keep from plateauing',
              'Graphs and visuals to track progress via custom account section',
              'Grocery list suggestions'
            ] }
            iconImage={ <Paper /> }
            onClick={ () => dispatch( openDialog( 'subscribe' ) ) }
          />
        </Grid>
      </Grid>
    </SingleColumn>
  );
}

export default Nutrition
