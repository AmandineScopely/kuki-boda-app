import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { type CodeFormProps } from '@/components/code-form';
import { CodeForm } from '@/components/code-form';
import {
  FocusAwareStatusBar,
  SafeAreaView,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const onSubmit: CodeFormProps['onSubmit'] = (data) => {
    console.log(data);
    if(data.code === '04072026') {
      setIsFirstTime(false);
      router.replace('/login');
    } else {
      setButtonDisabled(true);
      console.log("Waiting for 2 seconds...");
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    };
  };

  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />

      <SafeAreaView className="mt-6">
        <CodeForm buttonDisabled={buttonDisabled} onSubmit={onSubmit} />
      </SafeAreaView>
    </View>
  );
}
