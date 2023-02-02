'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase'


export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  function onChangeHandler(event) {
    const key = event.target.name;
    const value = event.target.value;
    setFormData(prevFormData => (
      {
        ...prevFormData,
        [key]: value
      }
    ))
  }

  function onSubmitHandler(event) {
    console.log("=== onSubmitHandler() invoked ============");

    // Prevent page refresh
    event.preventDefault();

    // Sign in user
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 

        // Clear any existing error messages
        setErrorMsg('');

        // Redirect to home page
        router.push('/');
      })
      .catch((error) => {

        // Update errorMsg
        setErrorMsg(error.message);
      });
  }

  return (
    <main>
      <h1>Sign in</h1>

      <form
        id="signin_form"
        onSubmit={ onSubmitHandler }
      >

        <div>
          <label htmlFor="signin_email">Email</label>
          <input
            type="email"
            id="signin_email"
            name="email"
            required
            value={ formData.email }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signin_password">Password</label>
          <input
            type="password"
            id="signin_password"
            name="password"
            required
            value={ formData.password }
            onChange={ onChangeHandler }
          />
        </div>
        <div>
          <Link href="/resetpassword">Forgot your password?</Link>
        </div>

        {/* display error message if an error exists */}
        {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}

        <button type="submit">Sign in</button>

      </form>

      <button>Sign in with Google</button>

    </main>
  )
}
