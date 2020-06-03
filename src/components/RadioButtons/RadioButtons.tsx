import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import MoreInfo from '../Popover/MoreInfo';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

const useStyles = makeStyles( theme => ( {
  popover: {
    position: 'absolute',
    left: 169,
    top: -14,
  },
  icon: {
    fontSize: 20,
  },
  explanationText: {
    // padding: 20,
  },
} ) )

export default function RadioButtons( {
  error,
  explanation,
  title,
  options,
  onChange,
  radioGroupProps
}: Props ) {
  const classes = useStyles();
  const handleChange = ( event ) => {
    onChange( event.target.value );
  }

  const { value } = options.find( option => {
    return option.selected === true;
  } );

  return (
    <FormControl component="fieldset" error={ error }>
      {
        explanation && (
          <MoreInfo className={ classes.popover } iconClassName={ classes.icon }>
            <Typography className={ classes.explanationText } variant="body2">
              { explanation }
            </Typography>
          </MoreInfo>
        )
      }

      <FormLabel component="legend">{ title }</FormLabel>
      <RadioGroup
        aria-label="gender"
        // name="gender1"
        value={ value }
        onChange={ handleChange }
        { ...radioGroupProps }
      >
        {
          options.map( ( { value, label } ) => (
            <FormControlLabel
              key={ label }
              value={ value }
              control={ <Radio/> }
              label={ label }
            />
          ) )
        }
      </RadioGroup>

    </FormControl>
  )
}


type Props = {
  explanation?: string | React.ReactChild[],
  error?: boolean,
  onChange: ( value: string ) => void,
  options: {
    value: string,
    label: string,
    selected?: boolean,
  }[],
  radioGroupProps?: any,
  title: string,
  // value: any,
};

