import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authorizationReducer, { moduleName as authorization } from '../legacyCode/ducks/authorization'
import peopleReducer, { moduleName as people } from '../legacyCode/ducks/people'
import { chatList } from './slices/chatList'
import { chatMessages } from './slices/chatMessages'

export default combineReducers({
  form,
  [authorization]: authorizationReducer,
  [people]: peopleReducer,
  messenger: combineReducers({
    chatList,
    chatMessages,
  }),
})
