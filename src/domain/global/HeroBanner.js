import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PageWidth from './PageWidth'
import { colors } from '../../styles/theme'

const useStyles = makeStyles( () => ( {
  section: {
    backgroundColor: colors.black,
    borderTop: `1px solid ${ colors.black }`,
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: '1.75rem',
    fontWidth: 200,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8vh',
    paddingBottom: '8vh',
  },
} ) )

const HeroBanner = ( { title, subtitle } ) => {
  const classes = useStyles()

  return (
    <section className={ classes.section }>
      <PageWidth className={ classes.container }>
        <Typography className={ `${ classes.text } ${ classes.title }` } variant="h1">
          { title }
        </Typography>
        <Typography
          className={ `${ classes.text } ${ classes.subTitle }` }
          variant="h2"
        >
          { subtitle }
        </Typography>
      </PageWidth>
    </section>
  )
}

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default HeroBanner
