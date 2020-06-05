import React from 'react'
import { Typography, Grid, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../styles/theme'
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { contactUsSubmission } from "../../redux/reducers/contactUs"

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputProps = {
    disableUnderline: true,
  }


  const formik = useFormik( {
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object( {
      name: Yup.string()
        .required(),
      email: Yup.string()
        .email( 'You may have a mistake in your email' )
        .required(),
      message: Yup.string()
        .max( 1000, 'Only 1000 characters allowed, please shorten your message' )
        .required()
    } ),
    onSubmit: values => {
      dispatch( contactUsSubmission( values ) );
      formik.resetForm();
    },
  } );


  return (
    <Grid id={ 'contact-us' } container xs={ 12 } className={ classes.container }>
      <Typography variant="h6">Contact Us</Typography>
      <Typography variant="body1" className={ classes.description }>Hey there, feel free to reach out if you have any questions or just want to let us know how we are doing! Also if our products do not do something you need just drop us a line and let us know and we can try to build in it in the future.</Typography>


      <Grid item xs={ 12 } className={ classes.inputContainer }>
        <div className={ classes.userInfoInputs }>
          <Grid md={ 6 }>
            <TextField
              error={ Boolean( formik.errors.name ) }
              helperText={ formik.errors.name }
              InputProps={ inputProps }
              className={ `${ classes.input } ${ classes.nameInput }` }
              label="Name"
              variant="filled"
              name="name"
              { ...formik.getFieldProps( 'name' ) }
            />
          </Grid>
          <Grid md={ 6 }>
            <TextField
              error={ Boolean( formik.errors.email ) }
              helperText={ formik.errors.email }
              InputProps={ inputProps }
              className={ `${ classes.input }` }
              label="Email"
              variant="filled"
              name="email"
              { ...formik.getFieldProps( 'email' ) }
            />
          </Grid>
        </div>
        <TextField
          error={ Boolean( formik.errors.message ) }
          helperText={ formik.errors.message }
          multiline
          rows={ 4 }
          rowsMax={ 8 }
          InputProps={ inputProps }
          className={ classes.input }
          label="Message"
          variant="filled"
          name="message"
          { ...formik.getFieldProps( 'message' ) }
        />
        {/*
          // @ts-ignore */}
        <Button
          onClick={ () => formik.handleSubmit() }
          className={ classes.button }
          variant="contained"
          color="secondary"
        >
          Send Message
        </Button>
      </Grid>

    </Grid>
  )
}

export default ContactUs
