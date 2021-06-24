import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Switch } from 'react-router-dom'

import PeopleForm from './PeopleForm'
import ProtectedRoute from '../common/protectedRoute'
import PeopleList from './PeopleList'
import { addPeople } from '../../ducks/people'

const PeopleModule = ({ addPeople }) => (
  <div>
    <div>
      <Link to="/people/add">Add item</Link>
      <Link to="/people/list" className="ml20">
        Go to list
      </Link>
    </div>
    <Switch>
      <ProtectedRoute exact path="/people/add" render={() => <PeopleForm onSubmit={addPeople} />} />
      <ProtectedRoute exact path="/people/list" component={PeopleList} />
      <Redirect to="/people/list" />
    </Switch>
  </div>
)

export default connect(
  null,
  { addPeople },
)(PeopleModule)
