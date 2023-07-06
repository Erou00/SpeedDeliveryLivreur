import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { useField } from 'formik';
import { FONT } from '../../constants';

const Field = ({label,...props}) => {
  const [field, meta] = useField(props);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <TextInput {...props}
        style={styles.inputStyle} placeholderTextColor='#4c4c4c'
        onChangeText={field.onChange(props.name)}
        onBlur={field.onBlur(props.name)}
        value={field.value}
      ></TextInput>
      
      {meta.touched && meta.error && (
            <Text style={styles.errorTxt}>
              {meta.error}
          </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle:{
      borderRadius: 5,
      color: '#000',
      fontWeight:'bold',
      padding: 5,
      width: '100%',
      height:50, 
      backgroundColor: 'rgb(220,220, 220)', 
      marginVertical: 5
    },
  label:{
    marginTop:15,
    fontFamily:FONT.medium,
    
  },
  errorTxt:{
    fontSize:12,
    color:'#FF0D10',
  }

})

export default Field 