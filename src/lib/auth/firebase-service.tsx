import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc,setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-config';

import { type SignUpData } from '@/types';


// Follows https://medium.com/@adityasinghrathore360/implementing-firebase-authentication-in-react-native-app-with-expo-a-detailed-explanation-cea4d1113501
export const signUpWithFirebase = async (data: SignUpData) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    //await emailVerification();
    const attendeesCollection = collection(db, 'logging');

    //User successfully registered
    const user = userCredentials.user;
    console.log('User registered: ', user);
    // Logging
    await setDoc(doc(attendeesCollection, user.uid), {
      'timestamp': new Date(),
      'action': 'sign up',
      'user_uid': user.uid,
      'name': data.name,
      'surname': data.surname ? data.surname : null,
      'email': user.email,
    })
    // You can redirect the user to another page or perform any additional actions here
    return user;
  } catch (error) {
    throw error;
  }
};

export const signInWithFirebase = async (data: SignUpData) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredentials.user;
    console.log('User sign-in:', userCredentials.user);
    const attendeesCollection = collection(db, 'logging');
    // Logging
    await setDoc(doc(attendeesCollection, user.uid), {
      'timestamp': new Date(),
      'action': 'sign in',
      'user_uid': user.uid,
      'name': data.name,
      'surname': data.surname ? data.surname : null,
      'email': user.email,
    })
    return userCredentials.user;
  } catch (error) {
    //console.error('Error logging in:', error);
    throw error;
  }
};

export const signOutWithFirebase = async () => {

  try {
    const user = auth.currentUser;
    if(user) {
      console.log('User sign-out:', user);
      const attendeesCollection = collection(db, 'logging');
      // Logging
      await setDoc(doc(attendeesCollection, user.uid), {
        'timestamp': new Date(),
        'action': 'sign in',
        'user_uid': user.uid,
        'name': null,
        'surname': null,
        'email': user.email,
      })
    }
    // Sign out from Firebase
    await signOut(auth);

    console.log('User logged out successfully.');
  } catch (error) {
    throw error;
  }
};
