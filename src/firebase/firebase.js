import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDerv7tdSZwE0JL72mXPEcvm2VNykqFdJ8',
    authDomain: 'bitbeatz-48669.firebaseapp.com',
    databaseURL: 'https://bitbeatz-48669.firebaseio.com',
    projectId: 'bitbeatz-48669',
    storageBucket: 'bitbeatz-48669.appspot.com',
    messagingSenderId: '476858903233',
    appId: '1:476858903233:web:488907523e923f1ac98240',
    measurementId: 'G-ZDWS06W6EC',
}

export const myFirebase = firebase.initializeApp(firebaseConfig)
const baseDb = myFirebase.firestore()
export const db = baseDb