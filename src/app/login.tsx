import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';
import { signup } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const [loading, setLoading] = useState(false);

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    setLoading(true);

    try {
      await signup(data);
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

    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </>
  );
}
