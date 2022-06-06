import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
    apiKey: 'AIzaSyCx6YtkFUJSSfSxsxxVZhs55NIgPyrNlEk',
    authDomain: "note-app-8255c.firebaseapp.com",
    projectId: 'note-app-8255c',
    storageBucket: 'note-app-8255c.appspot.com',
    messagingSenderId:'578026764585',
    appId: '1:578026764585:web:e963cca91edffa4b91df38',
    measurementId: 'G-MKHFT0QBPM'
  })

  export const auth = app.auth()
  export default app