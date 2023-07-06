import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import call from 'react-native-phone-call'


const PhoneBtn = ({btnWidth,btnHeight,btnImage,mr,handlePhoneBtn,num}) => {

  const makePhoneCall = () => {
    const args = {
      number: num, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
      skipCanOpen: true // Skip the canOpenURL check
    }
    
    call(args).catch(console.error)
  }
  return (
    <TouchableOpacity style={styles.btnContainer(btnWidth,btnHeight,mr)} onPress={makePhoneCall} >
         <Image source={btnImage} style={styles.btnImage} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer:(btnWidth,btnHeight,mr)=>({
        width:btnWidth,
        height:btnHeight,
        flex:1,
        justifyContent:'flex-start',
        // padding:5
        // position:'relative',
        marginRight:mr
    }),
    btnImage:(btnWidth,btnHeight)=>({
        // position:'absolute',
        width:btnWidth,
        height:btnHeight
    })
})
export default PhoneBtn