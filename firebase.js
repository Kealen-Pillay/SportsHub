import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXKRkng0tBCwvGyOWWaFR-T__cTJ52dmE",
  authDomain: "fir-auth-28c1b.firebaseapp.com",
  projectId: "fir-auth-28c1b",
  storageBucket: "fir-auth-28c1b.appspot.com",
  messagingSenderId: "122262797265",
  appId: "1:122262797265:web:ab5bf981f3e1d39a64fef0",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };