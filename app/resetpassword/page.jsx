'use client';

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/firebase'


export default function ResetPassword() {
    const [formData, setFormData] = useState({
        'email': '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [emailSent, setEmailSent] = useState(false);

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

        // Send email
        sendPasswordResetEmail(auth, formData.email)
            .then(() => {
                // Password reset email sent!
                setEmailSent(true);
            })
            .catch((error) => {
                setErrorMsg(error.message);
            });
    }

    return (
        <main>
            <h1>Reset password</h1>

            {
                emailSent ? 

                // Display this if emailSent is true
                <p>Check your email for a link to reset your password.</p> :

                // Display this if emailSent is false
                <form
                    id="resetpassword_form"
                    onSubmit={ onSubmitHandler }
                >

                    <div>
                        <label htmlFor="passwordreset_email">Email</label>
                        <input
                            type="email"
                            id="passwordreset_email"
                            name="email"
                            required
                            value={ formData.email }
                            onChange={ onChangeHandler }
                        />
                    </div>

                    {/* display error message if an error exists */ }
                    { errorMsg && <p style={ { color: "red" } }>{ errorMsg }</p> }

                    <button type="submit">Send password reset email</button>

                </form>
            }

        </main>
    )
}
