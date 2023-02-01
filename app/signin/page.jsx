'use client';

import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });

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

  return (
    <main>
      <h1>Sign in</h1>

      <form id="signin_form">

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

        <button type="submit">Sign in</button>

      </form>

      <button>Sign in with Google</button>

    </main>
  )
}
