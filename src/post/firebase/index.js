import firebase from 'firebase/app';
import 'firebase/storage';

 // Initialize Firebase
var config = {
  apiKey: "AIzaSyBqA6EfAvBtEy5OmZvIp-p1KP7XWchXbeQ",
  authDomain: "finalproject-66752.firebaseapp.com",
  databaseURL: "https://finalproject-66752.firebaseio.com",
  projectId: "finalproject-66752",
  storageBucket: "finalproject-66752.appspot.com",
  messagingSenderId: "68077867379"
};
firebase.initializeApp(config);

  const storage=firebase.storage();

export {
    storage, firebase as default
}