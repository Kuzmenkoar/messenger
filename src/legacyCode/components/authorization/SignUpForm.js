import React from 'react'
import AuthorizationContainer from './AuthorizationContainer'
import { Field, reduxForm } from 'redux-form'

const SignUpForm = ({ handleSubmit }) => console.log('SIGN UP') ||(
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
})(SignUpForm)
