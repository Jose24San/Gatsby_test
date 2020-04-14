import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../styles/theme'

const useStyles = makeStyles( theme => ( {
  widthContainer: {
    borderBottom: `2px solid ${ colors.greyBackground }`,
    paddingBottom: '1.5rem',

    [ theme.breakpoints.up( 'sm' ) ]: {
      marginTop: '2rem',
      paddingBottom: '1rem',
    },
  },
  imageOuterContainer: {
    marginTop: '1.3em',
    marginBottom: '1rem',

    [ theme.breakpoints.up( 'sm' ) ]: {
      marginTop: 0,
    },
  },
  imageInnerContainer: {
    margin: '0 auto',
    width: 200,
    [ theme.breakpoints.up( 'sm' ) ]: {
      width: 250,
    },
  },
  descriptionContainer: {
    marginBottom: '1rem',

    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 275,
    },
  },
  subtitle: {},
  description: {
    color: colors.textGrey,
  },
  button: {
    width: 200,
    marginTop: 20,
  },
} ) )

const ContentBlock = ( { image, title, description, buttonText, reverse } ) => {
  const classes = useStyles()

  const ImageBlock = (
    <Grid className={ classes.imageOuterContainer } item xs={ 12 } sm={ 6 }>
      <div className={ classes.imageInnerContainer }>
        { image }
      </div>
    </Grid>
  )

  const DescriptionBlock = (
    <Grid className={ classes.descriptionContainer } item xs={ 12 } sm={ 6 }>
      <Typography variant="h6" className={ classes.subtitle }>
        { title }
      </Typography>
      <Typography variant="body1" className={ classes.description }>
        { description }
      </Typography>
      <Button className={ classes.button } variant="contained" color="secondary">
        { buttonText }
      </Button>
    </Grid>
  )

  return (
    <Grid className={ classes.widthContainer } container xs={ 12 }>
      {
        reverse
          ? (
            <React.Fragment>
              { DescriptionBlock }
              { ImageBlock }
            </React.Fragment>
          )
          : (
            <React.Fragment>
              { ImageBlock }
              { DescriptionBlock }
            </React.Fragment>
          )
      }
    </Grid>
  )
}

export default ContentBlock
