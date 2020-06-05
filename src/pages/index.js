import React from 'react'
import 'typeface-roboto'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SEO from '../domain/global/seo'
import MealIconImage from '../images/MealIconImage'
import ContentBlock from '../components/CustomLayout/ContentBlock'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import ContactUs from '../domain/home/ContactUs'
import SingleColumn from '../layouts/SingleColumn'
import Dumbbell from '../images/Dumbbell'
import { useDispatch } from 'react-redux'
import { openDialog } from '../redux/reducers/dialogs'
import { EVENTS, logAnalyticEvent } from '../redux/reducers/firebaseAnalytics'


const useStyles = makeStyles( theme => ( {
  image: {
    marginBottom: 0,
  },
} ) )

const IndexPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const theme = useTheme()
  const matches = useMediaQuery( theme.breakpoints.up( 'sm' ) )

  return (
    <SingleColumn title="Fitomation" subtitle="Automate Fitness">
      <SEO title="Home"/>

      <ContentBlock
        image={ <MealIconImage className={ classes.image }/> }
        title="Macro & Nutrition Generator"
        description="Stop wondering how much you need to be eating. Stop trying to make sense of all the different formulas for gaining, maintaining and losing weight. Let us automate all that for you with our calculators so you can go back to doing you."
        buttonText="Simplify Nutrition"
        onClick={ () => {
          dispatch( logAnalyticEvent( EVENTS.INTERESTED_IN_NUTRITION ) )
        } }
        link="/nutrition"
      />

      <ContentBlock
        reverse={ matches }
        image={ <Dumbbell className={ classes.image } /> }
        title="Workout Generator"
        description="Generate custom workout plan tailored to your goals and needs using advanced algorithms."
        buttonText="Start Planning"
        onClick={ () => {
          dispatch( openDialog( 'subscribe' ) )
          dispatch( logAnalyticEvent( EVENTS.INTERESTED_IN_WORKOUTS ) )
        } }
      />

      <ContactUs/>

    </SingleColumn>
  )
}

export default IndexPage
