import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { signInWithFirebase, signUpWithFirebase, useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const signUp = useAuth.use.signUp();

  const [signType, setSignType] = useState<'signIn' | 'signUp'>('signIn');
  const [loading, setLoading] = useState(false);

  //const user = auth.currentUser;

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    setLoading(true);

    try {
      // Perform sign-in or sign-up
      const user = 
        signType === 'signIn' 
          ? await signInWithFirebase(data) 
          : await signUpWithFirebase(data);

      // Get user token and update zustand state and MMKV storage
      const token = await user.getIdToken();
      if (signType === 'signIn') {
        signIn({ access: token });
      }
      else {
        signUp({ access: token });
      }

      // Redirect to the homepage
      router.push('/');
    } catch (error: any) {
      // Handle Firebase error codes
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please choose a different email or try to login.');
      } else if (error.code === 'auth/weak-password') {
        alert('Weak password. Please choose a stronger password.');
      } else if (error.code === 'auth/invalid-credential') {
        alert('Invalid credentials, please sign up.');
        setSignType('signUp');
      } else {
        alert('Signup error: ' + error.message);
      }
    } finally {
      // Ensure loading state is reset
      setLoading(false);
    }

  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} loading={loading} signType={signType} />
    </>
  );
}
