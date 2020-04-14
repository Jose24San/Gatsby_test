import React from 'react'
import { Link } from 'gatsby'
import 'typeface-roboto'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import PageWidth from '../components/PageWidth'
import MealIconImage from '../images/MealIconImage'
import { colors } from '../styles/theme'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles( theme => ( {
  image: {
    // maxWidth: 250,
    marginBottom: 0,
  },
  imageContainer: {
    margin: '0 auto',
    width: 200,
    [ theme.breakpoints.up( 'sm' ) ]: {
      width: 250,
    },
  },
  subtitle: {
    color: colors.secondaryColor,
  },
  description: {
    color: colors.textGrey,
  },
  widthContainer: {
    [ theme.breakpoints.up( 'sm' ) ]: {
      marginTop: '1rem',
    },
  },
  iconContainer: {
    marginTop: '1.3em',
    marginBottom: '1rem',

    [ theme.breakpoints.up( 'sm' ) ]: {
      marginTop: 0,
    },
  },
  textContainer: {
    marginBottom: '1rem',

    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 275,
    },
  },
} ) )

const IndexPage = () => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home"/>
      <PageWidth>
        <Grid className={ classes.widthContainer } container xs={ 12 } spacing={ 3 }>

          <Grid className={ classes.iconContainer } item xs={ 12 } sm={ 6 }>
            <div className={ classes.imageContainer }>
              <MealIconImage className={ classes.image } />
            </div>
          </Grid>

          <Grid xs={ 12 } sm={ 6 } item className={ classes.textContainer }>

            <Typography variant="h6" className={ classes.subtitle }>
              Macro & Nutrition Calculator
            </Typography>
            <Typography variant="body1" className={ classes.description }>
              Stop wondering how much you need to be eating. Stop trying to make sense of all the different formulas for gaining, maintaining and losing weight. Let us automate all that for you with our calculators so you can go back to doing you.
            </Typography>

            <Button variant="contained">Simplify Nutrition</Button>

          </Grid>

        </Grid>


        {/*<Link to="/page-2/">Go to page 2</Link>*/}
      </PageWidth>
    </Layout>
  )
}

export default IndexPage
