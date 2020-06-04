import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Location } from '@reach/router';
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { colors } from '../styles/theme'
import Subscribe from '../domain/global/Subscribe'
import Notification from '../domain/global/Notification'
import { useDispatch } from 'react-redux'
import { openDialog } from '../redux/reducers/dialogs'



const useStyles = makeStyles( theme => ( {
  linkContainer: {
    padding: '10px 20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  mobileLink: {
    textDecoration: 'none',
    color: '#000',
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


  root: {
    '& .MuiPopover-root': {
      maxWidth: 300,
    },
  },
  contain: {
    maxWidth: 275,
    height: 10,
    overflowX: 'hidden',
  },

  mobileContainer: {
    overflowX: 'hidden',
  },
} ) )

const Header = ( { siteTitle } ) => {
  const [ anchorEl, setAnchorEl ] = useState( null )
  const theme = useTheme()
  const isSmallViewport = useMediaQuery( theme.breakpoints.down( 'xs' ) )
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = ( { currentTarget } ) => setAnchorEl( currentTarget )
  const handleClose = () => setAnchorEl( null )

  const scroll = () => {
    const section = document.querySelector( '#contact-us' );
    section.scrollIntoView( { behavior: 'smooth' } )
  };

  const openSubscribe = () => {
    dispatch( openDialog( 'subscribe' ) )

    if ( isSmallViewport ) {
      setAnchorEl( null );
    }
  }

  return (
    <Location>
      {
        locationProps => (
          <Fragment>
            <AppBar position="static" className={ classes.navigation }>
              <div className={ classes.container }>
                {
                  isSmallViewport
                    ? (
                      <div className={ classes.mobileContainer }>
                        <IconButton
                          className={ classes.iconContainer }
                          onClick={ handleClick }>
                          <MenuIcon className={ classes.icon } />
                        </IconButton>

                        <Menu
                          id="simple-menu"
                          anchorEl={ anchorEl }
                          keepMounted
                          open={ Boolean( anchorEl ) }
                          onClose={ handleClose }
                          className={ `${ classes.contain }` }
                          PopoverClasses={ {
                            // root: classes.root,
                            // paper: classes.root
                          } }
                        >
                          <MenuItem onClick={ handleClose }>HOME</MenuItem>
                          <MenuItem onClick={ handleClose }>NUTRITION</MenuItem>
                          <MenuItem onClick={ openSubscribe }>
                            WORKOUTS
                          </MenuItem>
                          {/*<MenuItem onClick={ handleClose }>*/}
                          {/*  <a className={ classes.mobileLink } href="#contact-us">*/}
                          {/*    CONTACT*/}
                          {/*  </a>*/}
                          {/*</MenuItem>*/}
                        </Menu>
                      </div>
                    )
                    : (
                      <Fragment>
                        <Typography variant="body2" className={ classes.linkContainer }>
                          <Link to="/" className={ classes.link }>HOME</Link>
                        </Typography>
                        <Typography variant="body2" className={ classes.linkContainer }>
                          <Link to="/nutrition" className={ classes.link }>NUTRITION</Link>
                        </Typography>
                        <Typography
                          onClick={ openSubscribe }
                          variant="body2"
                          className={ classes.linkContainer }>
                          {/*<Link to="/" className={ classes.link }>*/}
                          {/*  WORKOUTS*/}
                          {/*</Link>*/}
                          WORKOUTS
                        </Typography>
                        {/*<Typography*/}
                        {/*  onClick={ scroll }*/}
                        {/*  variant="body2"*/}
                        {/*  className={ classes.linkContainer }*/}
                        {/*>*/}
                        {/*    CONTACT*/}
                        {/*</Typography>*/}
                      </Fragment>
                    )
                }
              </div>
            </AppBar>

            <Notification />
            <Subscribe locationProps={ locationProps } />
          </Fragment>
        )
      }
    </Location>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
