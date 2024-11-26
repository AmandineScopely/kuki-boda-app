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

  const signType: 'signIn' | 'signUp' = 'signIn'

  const [loading, setLoading] = useState(false);

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    setLoading(true);

    try {
      let user = signType === 'signIn' ? await signInWithFirebase(data) : await signUpWithFirebase(data);
      let token = await user.getIdToken();
      if (signType === 'signIn') {
        signIn({ access: token });
      }
      else {
        signUp({ access: token });
      }
      console.log('User ', user.uid, ' has ' + signType + ' with email: ', user.email, ' and his token is: ', token);
      router.push('/');
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please choose a different email or try to login.');
      } else if (error.code === 'auth/weak-password') {
        alert('Weak password. Please choose a stronger password.');
      } else {
        alert('Signup error: ' + error.message);
      }
    }

  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} loading={loading} signType={signType} />
    </>
  );
}
