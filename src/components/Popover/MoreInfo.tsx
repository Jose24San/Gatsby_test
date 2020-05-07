import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tooltip, Typography, Popover as BasePopover, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles( theme => ( {
  typography: {
    padding: theme.spacing( 2 ),
  },
  icon: {
    fontSize: 20,
    zIndex: 100,
  },
  container: {
    // width: 400,
  },
  explanationContainer: {
    maxWidth: 400,
    padding: 20,
  },
} ) )

const MoreInfo = ( { children, className, iconClassName }: Props ) => {
  const classes = useStyles()
  const [ anchorEl, setAnchorEl ] = React.useState( null )

  const handleClick = ( { currentTarget } ) => {
    setAnchorEl( currentTarget )
  }

  const handleClose = () => {
    setAnchorEl( null )
  }

  const open = Boolean( anchorEl )
  const id = open ? 'simple-popover' : undefined

  return (
    <div className={ className }>
      <Tooltip title="">
        <IconButton onClick={ handleClick } >
          <HelpIcon className={ `${ classes.icon } ${  iconClassName }` } />
        </IconButton>
      </Tooltip>

      <BasePopover
        id={ id }
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'center',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'center',
        } }
        classes={ {
          root: classes.container,
        } }
      >
        <div className={ classes.explanationContainer }>
          {
            children
          }
        </div>

      </BasePopover>
    </div>
  )
}

type Props = {
  children: any,
  className?: string,
  iconClassName?: string,
};

export default MoreInfo;
