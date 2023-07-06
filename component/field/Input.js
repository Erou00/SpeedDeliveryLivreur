import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { TextInput } from 'react-native';

const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
  }) => {

const [hidePassword, setHidePassword] = useState(password);
const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{marginBottom: 20}}>
    <Text style={style.label}>{label}</Text>
    <View
      style={[
        style.inputContainer,
        {
          borderColor: error
            ? 'red'
            : isFocused
            ? COLORS.tertiary
            : COLORS.lightWhite,
          alignItems: 'center',
        },
      ]}>
      <Ionicons 
        name={iconName}
        style={{color: COLORS.tertiary, fontSize: 22, marginRight: 10}}
      />
      <TextInput
        autoCorrect={false}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={hidePassword}
        style={{color: COLORS.tertiary, flex: 1}}
        {...props}
      />
      {password && (
        <Ionicons 
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          style={{color: COLORS.darkBlue, fontSize: 22}}
        />
      )}
    </View>
    {error && (
      <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
        {error}
      </Text>
    )}
  </View>
  )
}

const style = StyleSheet.create({
    label: {
      marginVertical: 5,
      fontSize: 14,
      color: COLORS.grey,
    },
    inputContainer: {
      height: 55,
      backgroundColor: COLORS.light,
      flexDirection: 'row',
      paddingHorizontal: 15,
      borderWidth: 0.5,
    },
  });

export default Input