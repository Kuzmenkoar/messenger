import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Loader from '../common/loader'

const PeopleForm = ({ handleSubmit, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <Field name="surname" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <Field name="phone" component="input" type="number" />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

const mapStateToProps = ({ people: { isLoading } }) => ({
  isLoading,
})

export default connect(mapStateToProps)(reduxForm({ form: 'people' })(PeopleForm))
