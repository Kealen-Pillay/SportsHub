// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5hhJI-NujWYo4ydqKhntdKYBnC7iRCvA",
  authDomain: "sportshub-auth-473fe.firebaseapp.com",
  projectId: "sportshub-auth-473fe",
  storageBucket: "sportshub-auth-473fe.appspot.com",
  messagingSenderId: "572702718252",
  appId: "1:572702718252:web:4a633efd537778f1885489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);