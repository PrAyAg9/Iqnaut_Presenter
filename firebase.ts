// // src/firebase.ts

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export services for use throughout your app
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export { auth, db };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAzHtylpenWIWISm8FCkw4mfI3XkWai7o",
    authDomain: "dummy-43d19.firebaseapp.com",
    projectId: "dummy-43d19",
    storageBucket: "dummy-43d19.firebasestorage.app",
    messagingSenderId: "73451904889",
    appId: "1:73451904889:web:e48e8a44b8efd543ab99a8",
    measurementId: "G-MFKT5RLM7C"
  };;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
