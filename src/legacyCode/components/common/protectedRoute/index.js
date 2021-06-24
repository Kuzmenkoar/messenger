import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import UnAuthorized from '../unAuthorized'

class ProtectedRoute extends Component {
  render() {
    const { isAuthorized, ...rest } = this.props

    if (isAuthorized) {
      return <Route {...rest} />
    }

    return <Route {...rest} component={UnAuthorized} />
  }
}

const mapStateToProps = ({ authorization }) => ({
  isAuthorized: !!authorization.user,
})

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false },
)(ProtectedRoute)
