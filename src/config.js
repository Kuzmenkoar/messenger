import firebase from 'firebase'

export const appName = 'fir-lovkikman'
export const firebaseConfig = {
  apiKey: 'AIzaSyC363pqvg8Et05Rq9k7t3HcnTkOMywrPc4',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: '762329996833',
}

firebase.initializeApp(firebaseConfig)
