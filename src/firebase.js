import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyDV8QWnJuWx4CQxsRwcRBBSfc0BdB1eUFw",
    authDomain: "restaurant-68d90.firebaseapp.com",
    projectId: "restaurant-68d90",
    storageBucket: "restaurant-68d90.appspot.com",
    messagingSenderId: "447846039578",
    appId: "1:447846039578:web:2815a52fc4661c364f11a3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;