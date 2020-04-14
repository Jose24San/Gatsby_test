import React from 'react'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../styles/theme'

const useStyles = makeStyles( theme => ( {
  container: {
    paddingTop: '2rem',
  },
  description: {
    color: colors.textGrey,
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: 'none',
  },
  button: {
    width: 200,
    marginTop: 15,
  },
  userInfoInputs: {
    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  nameInput: {
    [ theme.breakpoints.up( 'md' ) ]: {
      paddingRight: 20,
    },
  },
  emailInput: {
    [ theme.breakpoints.up( 'md' ) ]: {
      paddingLeft: 20,
    },
  },
} ) )

const ContactUs = () => {
  const classes = useStyles()
  const inputProps = {
    disableUnderline: true,
  }

  return (
    <Grid container xs={ 12 } className={ classes.container }>
      <Typography variant="h6">Contact Us</Typography>
      <Typography variant="body1" className={ classes.description }>Hey there, feel free to reach out if you have any questions or just want to let us know how we are doing! Also if our products do not do something you need just drop us a line and let us know and we can try to build in it in the future.</Typography>


      <Grid item xs={ 12 } className={ classes.inputContainer }>

        <div className={ classes.userInfoInputs }>
          <Grid md={ 6 }>
            <TextField
              InputProps={ inputProps }
              className={ `${ classes.input } ${ classes.nameInput }` }
              label="Name"
              variant="filled"
            />
          </Grid>

          <Grid md={ 6 }>
            <TextField
              InputProps={ inputProps }
              className={ `${ classes.input } ` }
              label="Email"
              variant="filled"
            />
          </Grid>
        </div>


        <TextField
          multiline
          rows={ 4 }
          InputProps={ inputProps }
          className={ classes.input }
          label="Message"
          variant="filled"
        />

        <Button className={ classes.button } variant="contained" color="secondary">
          Send Message
        </Button>
      </Grid>

    </Grid>
  )
}

export default ContactUs
