import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native'; //'react-native-keyboard-controller'
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  code: z
    .string({
      required_error: 'Code is required',
    })
});

export type FormType = z.infer<typeof schema>;

export type CodeFormProps = {
  buttonDisabled: boolean;
  onSubmit?: SubmitHandler<FormType>;
};

export const CodeForm = ({ buttonDisabled, onSubmit = () => {} }: CodeFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            Enter Code
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Welcome! 👋 This is a demo login screen! Feel free to use any email
            and password to sign in and try it out.
          </Text>
        </View>

        <ControlledInput
          testID="code"
          control={control}
          name="code"
          label="Code"
        />

        <Button
          label="Submit"
          disabled={buttonDisabled}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
