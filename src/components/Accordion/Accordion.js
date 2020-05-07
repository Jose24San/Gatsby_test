import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles( theme => ( {
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem( 15 ),
    fontWeight: theme.typography.fontWeightRegular,
  },
} ) )

export default function Accordion( { containerStyle, cardStyle, data } ) {
  const classes = useStyles()

  return (
    <div className={ `${ classes.root } ${ containerStyle }` }>

      {
        data.map( accordionItem => (
          <ExpansionPanel
            classes={ {
              root: cardStyle,
            } }
            key={ accordionItem.title }
          >

            <ExpansionPanelSummary
              expandIcon={ <ExpandMoreIcon/> }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={ classes.heading }>
                { accordionItem.title }
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              { accordionItem.content }
            </ExpansionPanelDetails>

          </ExpansionPanel>
        ) )
      }
    </div>
  )
}

Accordion.propTypes = {
  cardStyle: PropTypes.string,
  containerStyle: PropTypes.string,
  data: PropTypes.arrayOf( PropTypes.shape( {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType( [ PropTypes.array, PropTypes.element ] ),
  } ) ),
};
