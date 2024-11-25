import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc,setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-config';

import { type SignUpData } from '@/types';

// Follows https://medium.com/@adityasinghrathore360/implementing-firebase-authentication-in-react-native-app-with-expo-a-detailed-explanation-cea4d1113501
export const signup = async (data: SignUpData) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
    //await emailVerification();
    const attendeesCollection = collection(db, 'attendees');
    await setDoc(doc(attendeesCollection, data.name), {
      'name': data.name,
      'email': data.email,
    })

    //User successfully registerd
    const user = userCredentials.user;
    console.log('User registered: ', user);
    // You can redirect the user to another page or perform any additional actions here
    return user;
  } catch (error) {
    throw error;
  }
};
