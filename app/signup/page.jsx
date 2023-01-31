'use client';

import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    'fullName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
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
      <h1>Sign up</h1>

      <form id="signup_form">

        <div>
          <label htmlFor="signup_full_name">Full Name</label>
          <input
            type="text"
            id="signup_full_name"
            name="fullName"
            required
            value={ formData.fullName }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_email">Email</label>
          <input
            type="email"
            id="signup_email"
            name="email"
            required
            value={ formData.email }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_password">Password</label>
          <input
            type="password"
            id="signup_password"
            name="password"
            required
            value={ formData.password }
            onChange={ onChangeHandler }
          />
        </div>

        <div>
          <label htmlFor="signup_confirm_password">Confirm password</label>
          <input
            type="password"
            id="signup_confirm_password"
            name="confirmPassword"
            required
            value={ formData.confirmPassword }
            onChange={ onChangeHandler }
          />
        </div>

        <button type="submit">Sign up</button>

      </form>

      <button>Sign up with Google</button>

    </main>
  )
}
