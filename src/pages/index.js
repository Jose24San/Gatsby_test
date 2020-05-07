import React from 'react'
import 'typeface-roboto'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SEO from '../components/seo'
import MealIconImage from '../images/MealIconImage'
import ContentBlock from '../components/CustomLayout/ContentBlock'
import InProgressImage from '../images/InProgressImage'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import ContactUs from '../components/ContactUs'
import SingleColumn from '../layouts/SingleColumn'


const useStyles = makeStyles( theme => ( {
  image: {
    marginBottom: 0,
  },
} ) )

const IndexPage = () => {
  const classes = useStyles()
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
        link="/nutrition"
      />

      <ContentBlock
        reverse={ matches }
        image={ <InProgressImage className={ classes.image }/> }
        title="Workout Generator"
        description="Our workout generator is still a work in a progress but check back later to see if we are finished with it. It will use advanced algorithms to determine the most effective way to train your body for your goals"
        buttonText="Waiting List"
      />

      <ContactUs/>
    </SingleColumn>
  )
}

export default IndexPage
