import React, { Component } from 'react'
import { connect } from 'react-redux'

import { allPeopleSelector, fetchAllPeople } from '../../ducks/people'
import Loader from '../common/loader'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    const { isLoading, entities } = this.props

    if (isLoading) {
      return <Loader />
    }

    console.log('here', entities)

    if (!entities.length) {
      return null
    }
    return entities.map(row => (
      <div className="df jcsa" key={row.uid}>
        {Object.keys(row).map(el => {
          if (el === 'uid') {
            return null
          }
          return (
            <div className="ml20" key={el}>
              {row[el]}
            </div>
          )
        })}
      </div>
    ))
  }
}

const mapStateToProps = state => ({
  isLoading: state.people.isLoading,
  entities: allPeopleSelector(state),
})

export default connect(
  mapStateToProps,
  { fetchAllPeople },
)(PeopleList)
