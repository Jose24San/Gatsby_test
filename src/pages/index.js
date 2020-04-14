import React from 'react'
import 'typeface-roboto'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PageWidth from '../components/PageWidth'
import MealIconImage from '../images/MealIconImage'
import ContentBlock from '../components/ContentBlock'
import InProgressImage from '../images/InProgressImage'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import ContactUs from '../components/ContactUs'


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
    <Layout style={ { paddingTop: 0 } }>
      <SEO title="Home"/>
      <PageWidth>

        <ContentBlock
          image={ <MealIconImage className={ classes.image } /> }
          title="Macro & Nutrition Generator"
          description="Stop wondering how much you need to be eating. Stop trying to make sense of all the different formulas for gaining, maintaining and losing weight. Let us automate all that for you with our calculators so you can go back to doing you."
          buttonText="Simplify Nutrition"
        />

        <ContentBlock
          reverse={ matches }
          image={ <InProgressImage className={ classes.image } /> }
          title="Workout Generator"
          description="Our workout generator is still a work in a progress but check back later to see if we are finished with it. It will use advanced algorithms to determine the most effective way to train your body for your goals"
          buttonText="Waiting List"
        />

        <ContactUs />


        {/*<Link to="/page-2/">Go to page 2</Link>*/}
      </PageWidth>
    </Layout>
  )
}

export default IndexPage
