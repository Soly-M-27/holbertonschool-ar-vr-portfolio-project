import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB8xSSg4r_Vg5gp2pfUnQRKgoVQcpAJ74M",
    authDomain: "ar-rolodex.firebaseapp.com",
    projectId: "ar-rolodex",
    storageBucket: "ar-rolodex.appspot.com",
    messagingSenderId: "958075539111",
    appId: "1:958075539111:web:4b42691824d326cf855582"
  };

//init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

export { projectFirestore, projectAuth, projectStorage } 