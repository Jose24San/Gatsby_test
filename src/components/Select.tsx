import React from 'react'
import PropTypes from 'prop-types'
import { Select as BaseSelect, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ( {
  container: {
    width: '100%',
  },
} ) )

const Select = ( { containerStyle, error, options, label, ...props }: Props ) => {
  const classes = useStyles()

  return (
    <FormControl
      error={ Boolean( error ) }
      className={ `${ classes.container } ${ containerStyle }` }
    >
      <InputLabel>{ label }</InputLabel>
      <BaseSelect { ...props }>
        {
          options.map( ( option, index ) => (
            <MenuItem
              key={ `${ option }_${ index }` }
              value={ option }
            >
              { option }
            </MenuItem>
          ) )
        }
      </BaseSelect>
      <FormHelperText>{ error }</FormHelperText>
    </FormControl>
  )
}

type Props = {
  containerStyle?: any,
  error?: string | string[],
  label: string,
  options: string[]
  [ property: string ]: any,
};

export default Select;
