import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const BodyComponent = ({popup,setMotif}) => {
  return (
        <View>
          <TextInput  placeholder=''   style={styles.inputStyle} placeholderTextColor='#4c4c4c'
             onChangeText={txt => setMotif(txt)}
          />
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
  }
  
})

export default BodyComponent
