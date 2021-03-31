import  firebase from 'firebase';
require('firebase/firestore');

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyABCpfzR4yLVFyTbDXwqSSg8r4LfK12mFc",
  authDomain: "project71-11ffc.firebaseapp.com",
  projectId: "project71-11ffc",
  storageBucket: "project71-11ffc.appspot.com",
  messagingSenderId: "892542671312",
  appId: "1:892542671312:web:c350f5b11916175e1381d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();