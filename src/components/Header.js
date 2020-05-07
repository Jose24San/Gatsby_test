import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { colors } from '../styles/theme'

const useStyles = makeStyles( theme => ( {
  linkContainer: {
    padding: '10px 20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 1008,
    margin: '0 auto',
  },
  navigation: {
    backgroundColor: colors.black,
    boxShadow: 'none',
    borderBottom: `1px solid ${ colors.black }`,
  },
  iconContainer: {
    borderBottom: 'none',
  },
  icon: {
    color: '#fff',
    width: 50,
    height: 50,
  },
} ) )

const Header = ( { siteTitle } ) => {
  const [ anchorEl, setAnchorEl ] = useState( null )
  const theme = useTheme()
  const isSmallViewport = useMediaQuery( theme.breakpoints.down( 'xs' ) )
  const classes = useStyles()

  const handleClick = ( { currentTarget } ) => setAnchorEl( currentTarget )
  const handleClose = () => setAnchorEl( null )


  return (
    <AppBar position="static" className={ classes.navigation }>
      <div className={ classes.container }>
        {
          isSmallViewport
            ? (
              <Fragment>
                <IconButton className={ classes.iconContainer } onClick={ handleClick }>
                  <MenuIcon className={ classes.icon } />
                </IconButton>

                <Menu
                  id="simple-menu"
                  anchorEl={ anchorEl }
                  keepMounted
                  open={ Boolean( anchorEl ) }
                  onClose={ handleClose }
                >
                  <MenuItem onClick={ handleClose }>HOME</MenuItem>
                  <MenuItem onClick={ handleClose }>NUTRITION</MenuItem>
                  <MenuItem onClick={ handleClose }>WORKOUTS</MenuItem>
                  <MenuItem onClick={ handleClose }>CONTACT</MenuItem>
                </Menu>
              </Fragment>
            )
            : (
              <Fragment>
                <Typography variant="body2" className={ classes.linkContainer }>
                  <Link to="/" className={ classes.link }>HOME</Link>
                </Typography>
                <Typography variant="body2" className={ classes.linkContainer }>
                  <Link to="/nutrition" className={ classes.link }>NUTRITION</Link>
                </Typography>
                <Typography variant="body2" className={ classes.linkContainer }>
                  <Link to="/" className={ classes.link }>WORKOUTS</Link>
                </Typography>
                <Typography variant="body2" className={ classes.linkContainer }>
                  <Link to="/" className={ classes.link }>CONTACT</Link>
                </Typography>
              </Fragment>
            )
        }
      </div>
    </AppBar>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
