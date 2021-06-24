import React from 'react'
import { Field, reduxForm } from 'redux-form'
import AuthorizationContainer from './AuthorizationContainer'

const SignInForm = ({ handleSubmit }) => console.log('SIGN in') ||(
  <AuthorizationContainer>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </AuthorizationContainer>
)

export default reduxForm({
  form: 'signIn',
})(SignInForm)
