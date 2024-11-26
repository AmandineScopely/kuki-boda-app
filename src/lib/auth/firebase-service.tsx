import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc,setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-config';

import { type SignUpData } from '@/types';

// Follows https://medium.com/@adityasinghrathore360/implementing-firebase-authentication-in-react-native-app-with-expo-a-detailed-explanation-cea4d1113501
export const signUpWithFirebase = async (data: SignUpData) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    //await emailVerification();
    const attendeesCollection = collection(db, 'attendees');

    //User successfully registered
    const user = userCredentials.user;
    console.log('User registered: ', user);
    // Logging
    await setDoc(doc(attendeesCollection, user.uid), {
      'timestamp': new Date(),
      'action': 'sign up',
      'user_uid': user.uid,
      'name': data.name,
      'surname': data.surname,
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
    const attendeesCollection = collection(db, 'attendees');
    // Logging
    await setDoc(doc(attendeesCollection, user.uid), {
      'timestamp': new Date(),
      'action': 'sign in',
      'user_uid': user.uid,
      'name': data.name,
      'surname': data.surname,
      'email': user.email,
    })
    return userCredentials.user;
  } catch (error) {
    //console.error('Error logging in:', error);
    throw error;
  }
};
