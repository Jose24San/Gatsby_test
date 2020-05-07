import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SingleColumn from '../layouts/SingleColumn'
import SpoonForkImage from '../images/SpoonForkImage'
import NutritionCard from '../components/Cards/NutritionCard'
import Energy from '../images/Energy'
import Water from '../images/Water'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles( theme => ( {
  cardContainer: {
    marginTop: 40,
  },
  container: {
    margin: 0,
  },
  iconContainerStyle: {
    width: 70,
  },
} ) )

const Nutrition = () => {
  const classes = useStyles()

  return (
    <SingleColumn title="Nutrition" containerStyle={ { minHeight: '80vh' } }>
      <Grid container spacing={ 4 } className={ classes.container }>

        <Grid className={ classes.cardContainer } item xs={ 12 }>
          <NutritionCard
            title="Macro & Calorie Meal Plan"
            description={ [
              'Calorie Calculations for gaining, maintaining and losing weight',
              'Guide approached for reaching goal with best practices in mind',
              'Calorie and Macronutrient break down by day'
            ] }
            iconImage={ <SpoonForkImage/> }
            link="nutrition/macroGenerator"
          />
        </Grid>

        <Grid className={ classes.cardContainer } item xs={ 12 }>
          <NutritionCard
            title="Fitomation Meal Plan"
            description={ [
              'Custom made meal plan that span 6-12 weeks',
              'Calorie and Macro break down by day',
              'Meal number and sizes breakdown based on activity level for each day',
              'Built in auto adjusting to keep from plateauing',
              'Grocery list meal plan builder'
            ] }
            iconImage={ <SpoonForkImage/> }
            link="nutrition/macroGenerator"
          />
        </Grid>

        {/*<Grid className={ classes.cardContainer } item xs={ 12 } sm={ 6 }>*/}
        {/*  <NutritionCard*/}
        {/*    title="Total Daily Energy Expenditure"*/}
        {/*    description="Calories you need to eat to cover you energy requirements for the day."*/}
        {/*    iconImage={ <Energy /> }*/}
        {/*  />*/}
        {/*</Grid>*/}

        {/*<Grid className={ classes.cardContainer } item xs={ 12 } sm={ 6 }>*/}
        {/*  <NutritionCard*/}
        {/*    title="Resting Metabolic Rate"*/}
        {/*    description="Minimum amount of energy the body uses just to maintain itself without any activity"*/}
        {/*    iconImage={ <Energy /> }*/}
        {/*  />*/}
        {/*</Grid>*/}

        {/*<Grid className={ classes.cardContainer } item xs={ 12 } sm={ 6 }>*/}
        {/*  <NutritionCard*/}
        {/*    title="Recommended Water Intake"*/}
        {/*    description="Amount of water you should be drinking to reach your fitness goals"*/}
        {/*    iconImage={ <Water className={ classes.iconContainerStyle } /> }*/}
        {/*  />*/}
        {/*</Grid>*/}

      </Grid>
    </SingleColumn>
  );
}

export default Nutrition
