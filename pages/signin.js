import React from 'react';
import Container from '@material-ui/core/Container';
import SigninForm from '../components/signinForm/signinForm';

import signIn from '../utils/auth';
import Snackbar from "@material-ui/core/Snackbar";

import Alert from '@material-ui/lab/Alert';
import {useRouter} from 'next/router';

async function handleSignInForm(formData){
  await signIn(formData.email, formData.password);
}

export default function Signin() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");


  return (
    <>
    <Container maxWidth="sm">
      <SigninForm onSubmit={handleSignInForm} />
    </Container>

    <Snackbar open={open} autoHideDuration={6000}>
  <Alert severity="error">
 {message}

  </Alert>
</Snackbar>

    </>
  );
}
