import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyDUmDe90j1q_RglG55mP0eEI1uuSRZSWgc",
    authDomain: "pda-project-d23c3.firebaseapp.com",
    projectId: "pda-project-d23c3",
    storageBucket: "pda-project-d23c3.appspot.com",
    messagingSenderId: "407229889271",
    appId: "1:407229889271:web:3960ac677988a83706f1f2",
    measurementId: "G-G7H214WYXP"
  };

  const app = initializeApp(firebaseConfig);

  // Get Firestore instance
  const db = getFirestore(app);

  export { app, db }; 