import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { theme } from '../../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  styleButton?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={props.styleButton ? props.styleButton : {

        borderRadius: 5,
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: theme.green,
        // elevation: 5,
      }}
      activeOpacity={0.6}
    >
      <Text
        style={props.styleTitle ? props.styleTitle : {
          textAlign: 'center',
          color: theme.white,
          fontWeight: '500',
          fontSize: 14,
        }}>
        {props.title ?? 'Titulo'}
      </Text>
    </TouchableOpacity>
  );
};