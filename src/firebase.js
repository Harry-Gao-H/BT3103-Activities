import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyAxwYVd-y2bH7hNRgKFb1txPXuaCv5_pRA",
    authDomain: "bt3103-week-6-8d645.firebaseapp.com",
    projectId: "bt3103-week-6-8d645",
    storageBucket: "bt3103-week-6-8d645.appspot.com",
    messagingSenderId: "143331829522",
    appId: "1:143331829522:web:623cb79f56522b682635cb",
    measurementId: "G-Z471K87JT5"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;


