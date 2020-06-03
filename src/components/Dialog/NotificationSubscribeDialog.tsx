import React, { useState } from "react"
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core"
import { useFormik } from "formik"
import * as Yup from 'yup'


export default function NotificationSubscribeDialog( {
  open,
  onClose,
  onSubscribe,
}: Props ) {

  const { errors, isValid, ...formik } = useFormik( {
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object( {
      name: Yup.string()
        .required( 'Required' )
        .max( 20, 'Just a simple name is fine' ),
      email: Yup.string()
        .email( 'Whoops, looks like there is a mistake in your email' )
        .required( 'Required' )
    } ),
    onSubmit: values => {
      formik.resetForm();
      onSubscribe( values );
    },
    validateOnMount: false,
  } );

  const handleClosing = () => {
    formik.resetForm();
    if ( onClose ) {
      onClose();
    }
  };

  return (
    <Dialog open={ open } onClose={ handleClosing } aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Whoops, looks like this feature is not ready yet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you would like to help us out by joining out beta user to help guide the development of this feature please fill this out.
        </DialogContentText>
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            name="name"
            { ...formik.getFieldProps( 'name' ) }
          />
          <TextField
            error={ ( errors.email !== 'Required' && errors.email !== undefined ) }
            helperText={ errors.email }
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            name="email"
            { ...formik.getFieldProps( 'email' ) }
          />
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClosing } color="primary">
          Cancel
        </Button>

        {/*
          // @ts-ignore */}
        <Button disabled={ !isValid } variant="contained" color="primary" onClick={ formik.handleSubmit }>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

type Props = {
  open: boolean,
  onClose: () => void,
  onSubscribe: ( contactInfo: { email: string, name: string } ) => void,
};
