import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { theme } from '../../styles/theme';

interface InputProps extends TextInputProps {
  validate?: boolean
}

export const Input = (props: InputProps) => {
  return (
    <TextInput
      style={{
        borderWidth: props.validate ? 1 : 0.3,
        borderColor: props.validate ? theme.red : '#D7D7D7',
        borderRadius: 3,
        backgroundColor: '#E7E9EE',
        padding: 10,
        color: theme.blackFont,

      }}
      {...props}
      placeholderTextColor={theme.grayFont}
    />
  );
};