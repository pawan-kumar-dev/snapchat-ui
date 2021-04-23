import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6ouyPg-IwTGT29q6hHDWUtrQMY7LPOpY",
  authDomain: "snapchat-app-30487.firebaseapp.com",
  projectId: "snapchat-app-30487",
  storageBucket: "snapchat-app-30487.appspot.com",
  messagingSenderId: "728363093525",
  appId: "1:728363093525:web:350ed7eab315472d5ac81c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
