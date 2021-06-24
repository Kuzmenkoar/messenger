import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './index.css'
import { signOut } from '../../../ducks/authorization'

class Header extends Component {
  render() {
    if (this.props.isAuthorized) {
      return (
        <div className="df jcsa header">
          <button onClick={this.props.signOut}>Sign out</button>
        </div>
      )
    }
    return (
      <div className="df jcsa header">
        <Link to="/signIn">SignIn</Link>
        <Link to="/signUp">SignUp</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ authorization }) => ({
  isAuthorized: !!authorization.user,
})

export default connect(
  mapStateToProps,
  { signOut },
)(Header)
