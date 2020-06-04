import React, { Fragment } from "react"
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styles/theme'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles( theme => ( {
  card: {
    padding: 20,
    cursor: 'pointer',
  },
  cardInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: '75%',
  },
  cardTitle: {
    color: colors.secondaryColor,
  },
  description: {
    marginTop: 10,
  },
  iconContainer: {
    width: '50%',
    minWidth: 88,
  },
} ) )

const NutritionCard = ( {
  description,
  iconImage,
  iconContainerStyle,
  link,
  onClick,
  title,
}: Props ) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={ 3 }
      className={ classes.card }
      onClick={ () => {
        if ( onClick ) onClick();
        if ( link ) navigate( link );
      } }
    >
      <Grid container spacing={ 2 }>
        <Grid item xs={ 8 }>
          <Typography variant="h6" className={ classes.cardTitle }>
            { title }
          </Typography>
          {
            typeof description === 'string'
              ? (
                <Typography variant="body2" className={ classes.description }>
                  { description }
                </Typography>
              )
              : (
                description.map( text => (
                  <Typography key={ text } variant="body2" className={ classes.description }>
                    { text }
                  </Typography>
                ) )
              )
          }
        </Grid>
        <Grid container justify="center" alignItems="center" item xs={ 4 }>
          <div className={ `${ classes.iconContainer } ${ iconContainerStyle }` }>
            { iconImage }
          </div>
        </Grid>
      </Grid>

    </Paper>
  )
}

type Props = {
  description: string | string[],
  iconImage: any,
  iconContainerStyle?: object,
  link?: string,
  onClick?: () => void,
  title: string,
};

export default NutritionCard
