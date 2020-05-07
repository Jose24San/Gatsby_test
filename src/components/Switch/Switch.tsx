import React, { useState } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

export default function SwitchesGroup( { checked, error, errorText, header, label }: Props ) {
  const [ switchState, setSwitchState ] = useState( false )
  const handleChange = event => setSwitchState( event.target.checked );

  return (
    <FormControl component="fieldset" error={ error }>
      <FormLabel component="legend">{ header }</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={ checked }
              onChange={ handleChange }
              // name="gilad"
            />
          }
          label={ label }
        />
      </FormGroup>
      <FormHelperText>{ errorText }</FormHelperText>
    </FormControl>
  )
}

type Props = {
  header?: string,
  label?: string,
  error?: boolean
  errorText?: string,
  checked: boolean,
};