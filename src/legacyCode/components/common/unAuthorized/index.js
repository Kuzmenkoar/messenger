import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const UnAuthorized = () => (
  <div className="df jcc aic un-authorized">
    Please
    <Link to="/signIn" className="ml20">
      SignIn
    </Link>
  </div>
)

export default connect()(UnAuthorized)
