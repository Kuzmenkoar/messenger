import { Record } from 'immutable'
import { all, put, take, call } from 'redux-saga/effects'
import firebase from 'firebase'
import { eventChannel } from 'redux-saga'

export const moduleName = 'authorization'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

const ReducerRecord = Record({
  user: null,
  isLoading: true,
  error: null,
  firstContact: false,
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_OUT_REQUEST:
      return state.set('isLoading', true)
    case SIGN_IN_SUCCESS:
    case SIGN_OUT_SUCCESS:
      return state
        .set('user', payload)
        .set('isLoading', false)
        .set('firstContact', true)
    case SIGN_IN_ERROR:
    case CLEAR_ERROR:
      return state.set('error', error).set('isLoading', false)
    default:
      return state
  }
}

export const signIn = data => ({
  type: SIGN_IN_REQUEST,
  payload: data,
})

export const signOut = () => ({
  type: SIGN_OUT_REQUEST,
})

export const signUp = data => ({
  type: SIGN_UP_REQUEST,
  payload: data,
})

export const clearError = () => ({
  type: CLEAR_ERROR,
})

export const signInSaga = function*() {
  const auth = firebase.auth()

  while (true) {
    const action = yield take(SIGN_IN_REQUEST)
    const { email, password } = action.payload

    try {
      yield call([auth, auth.signInWithEmailAndPassword], email, password)
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error,
      })
    }
  }
}

export const signUpSaga = function*() {
  const auth = firebase.auth()

  while (true) {
    const action = yield take(SIGN_UP_REQUEST)
    const { email, password } = action.payload

    try {
      yield call([auth, auth.createUserWithEmailAndPassword], email, password)
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        error,
      })
    }
  }
}

export const signOutSaga = function*() {
  const auth = firebase.auth()

  while (true) {
    yield take(SIGN_OUT_REQUEST)

    try {
      yield call([auth, auth.signOut])
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error,
      })
    }
  }
}

const createAuthChannel = () =>
  eventChannel(emit => firebase.auth().onAuthStateChanged(user => emit({ user })))

export const userAuthorizationStatus = function*() {
  const chan = yield call(createAuthChannel)

  while (true) {
    const data = yield take(chan)
    const { user } = data

    if (user) {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: user,
      })
    } else {
      yield put({
        type: SIGN_OUT_SUCCESS,
        payload: user,
      })
    }
  }
}

export const saga = function*() {
  yield all([signInSaga(), userAuthorizationStatus(), signOutSaga(), signUpSaga()])
}
