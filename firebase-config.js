import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyAlYRLHtg5RrCwBvqE4lNUixIJr5IIAnmk',
  authDomain: 'kuki-boda.firebaseapp.com',
  databaseURL: 'https://kuki-boda.firebaseio.com',
  projectId: 'kuki-boda',
  storageBucket: 'kuki-boda.firebasestorage.app',
  messagingSenderId: '776824360666',
  appId: '1:776824360666:web:54c5f30eb7dc709fda1fe3',
  //measurementId: 'G-measurement-id',
};

export const app = initializeApp(firebaseConfig, 'defaultApp');
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const db = getFirestore(app);

export const auth = getAuth(app);
