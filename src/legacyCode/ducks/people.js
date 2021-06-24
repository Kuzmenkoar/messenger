import { Record, OrderedMap } from 'immutable'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'
import { createSelector } from 'reselect'

import { fbDatatoEntities } from './utils'
import history from '../../history'

export const moduleName = 'people'
export const ADD_PEOPLE_ITEM_REQUEST = 'ADD_PEOPLE_ITEM_REQUEST'
export const ADD_PEOPLE_ITEM_ERROR = 'ADD_PEOPLE_ITEM_ERROR'
export const FETCH_ALL_PEOPLE_REQUEST = 'FETCH_ALL_PEOPLE_REQUEST'
export const FETCH_ALL_PEOPLE_SUCCESS = 'FETCH_ALL_PEOPLE_SUCCESS'
export const FETCH_ALL_PEOPLE_ERROR = 'FETCH_ALL_PEOPLE_ERROR'

const ReducerRecord = Record({
  isLoading: false,
  error: false,
  entities: new OrderedMap({}),
})

const PersonRecord = Record({
  uid: null,
  name: null,
  surname: null,
  phone: null,
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case ADD_PEOPLE_ITEM_REQUEST:
    case FETCH_ALL_PEOPLE_REQUEST:
      return state.set('isLoading', true)

    case FETCH_ALL_PEOPLE_SUCCESS:
      return state.set('isLoading', false).set('entities', fbDatatoEntities(payload, PersonRecord))

    case ADD_PEOPLE_ITEM_ERROR:
    case FETCH_ALL_PEOPLE_ERROR:
      return state.set('error', error).set('isLoading', false)
    default:
      return state
  }
}

export const stateSelector = state => state[moduleName]
export const allPeopleSelector = createSelector(stateSelector, state =>
  Object.values(state.entities.toJS()),
)

export const addPeople = data => ({
  type: ADD_PEOPLE_ITEM_REQUEST,
  payload: data,
})

export const fetchAllPeople = () => ({
  type: FETCH_ALL_PEOPLE_REQUEST,
})

export const addPeopleSaga = function*(action) {
  const peopleRef = firebase.database().ref('people')

  try {
    yield call([peopleRef, peopleRef.push], action.payload)

    yield history.push('/people/list')
  } catch (error) {
    yield put({
      type: ADD_PEOPLE_ITEM_ERROR,
      error: error,
    })
  }
}

export const fetchAllPeopleSaga = function*() {
  const peopleRef = firebase.database().ref('people')

  try {
    const data = yield call([peopleRef, peopleRef.once], 'value')

    yield put({
      type: FETCH_ALL_PEOPLE_SUCCESS,
      payload: data.val(),
    })
  } catch (error) {
    yield put({
      type: FETCH_ALL_PEOPLE_ERROR,
      error: error,
    })
  }
}

export const saga = function*() {
  yield all([
    takeEvery(ADD_PEOPLE_ITEM_REQUEST, addPeopleSaga),
    takeEvery(FETCH_ALL_PEOPLE_REQUEST, fetchAllPeopleSaga),
  ])
}
