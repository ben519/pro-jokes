export default function SignIn() {
  return (
    <main>
      <h1>Sign in</h1>

      <form id="signin_form">

        <div>
          <label htmlFor="signin_email">Email</label>
          <input type="email" id="signin_email" required />
        </div>

        <div>
          <label htmlFor="signin_password">Password</label>
          <input type="password" id="signin_password" required />
        </div>

        <button type="submit">Sign in</button>

      </form>

      <button>Sign in with Google</button>

    </main>
  )
}
