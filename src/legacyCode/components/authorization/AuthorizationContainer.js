import React, { Component } from 'react'
import Loader from '../common/loader'
import { connect } from 'react-redux'
import { clearError } from '../../ducks/authorization'
import history from '../../../history'

class AuthorizationContainer extends Component {
  state = {}

  static getDerivedStateFromProps(props) {
    const { error, clearError, isAuthorized } = props
    if (error) {
      alert(error.message)
      clearError()
    }

    if (isAuthorized) {
      history.push('/')
    }

    return null
  }

  render() {
    const { children, isLoading } = this.props
    if (isLoading) {
      return (
        <div style={{ height: '200px', position: 'relative' }}>
          <Loader />
        </div>
      )
    }

    return children
  }
}

const mapStateToProps = ({ authorization: { isLoading, error, user } }) => ({
  isLoading,
  isAuthorized: !!user,
  error,
})

export default connect(
  mapStateToProps,
  { clearError },
)(AuthorizationContainer)
