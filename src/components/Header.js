import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { colors } from '../styles/theme'

const styles = {
  navigation: {
    backgroundColor: colors.black,
    padding: 20,
    boxShadow: 'none',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 1008,
    margin: '0 auto',
  }
}

const Header = ( { siteTitle } ) => (
  <AppBar position="static" style={ styles.navigation }>
    <div style={ styles.container }>
      <Typography variant="body2">
        <Link to="/" style={ styles.link }>HOME</Link>
      </Typography>
      <Typography variant="body2">
        <Link to="/" style={ styles.link }>MACROS APP</Link>
      </Typography>
    </div>
  </AppBar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
