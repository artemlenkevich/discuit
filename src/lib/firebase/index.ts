// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDeFjp4FNaRIv-55358UdOlsDTPy16kic',
  authDomain: 'discuit-8c1fc.firebaseapp.com',
  projectId: 'discuit-8c1fc',
  storageBucket: 'discuit-8c1fc.appspot.com',
  messagingSenderId: '525486618755',
  appId: '1:525486618755:web:1da1ce36a3f3ff6f4c83b6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
