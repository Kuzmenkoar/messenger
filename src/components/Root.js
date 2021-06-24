import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import {connect} from 'react-redux';

import Header from '../legacyCode/components/common/header'
import SignInForm from '../legacyCode/components/authorization/SignInForm'
import SignUpForm from '../legacyCode/components/authorization/SignUpForm'

import { signIn, signUp } from '../legacyCode/ducks/authorization'
import ProtectedRoute from '../legacyCode/components/common/protectedRoute'
import PeopleModule from '../legacyCode/components/people/PeopleModule'
import {Router} from 'react-router';
import history from '../history';
import { Messenger} from './messenger';

class Root extends Component {
  render() {

    return (
      <div>
        <Router history={history}>
        <Header />

        <Switch>
          <ProtectedRoute path="/people" component={PeopleModule} />
          <ProtectedRoute path="/messenger/:chat" component={Messenger} />
          <ProtectedRoute path="/messenger" component={Messenger} />
          <Route path="/signIn" render={() => <SignInForm onSubmit={this.props.signIn} />} />
          <Route path="/signUp" render={() => <SignUpForm onSubmit={this.props.signUp} />} />
          <Redirect exact from="/" to="/messenger" />
        </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({ router, authorization: { firstContact } }) => {
  return {
    firstContact,
    router, // pure: false
  }
}

export default connect(
  mapStateToProps,
  { signIn, signUp },
)(Root)
