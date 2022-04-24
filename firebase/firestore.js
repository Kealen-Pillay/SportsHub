import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5hhJI-NujWYo4ydqKhntdKYBnC7iRCvA",
  authDomain: "sportshub-auth-473fe.firebaseapp.com",
  projectId: "sportshub-auth-473fe",
  storageBucket: "sportshub-auth-473fe.appspot.com",
  messagingSenderId: "572702718252",
  appId: "1:572702718252:web:4a633efd537778f1885489",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const firestore = firebase.firestore();

export { firestore };
