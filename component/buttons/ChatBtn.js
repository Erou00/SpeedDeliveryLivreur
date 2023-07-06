import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'

const ChatBtn = ({btnWidth,btnHeight,btnImage,handlePhoneBtn}) => {
  return (
    <TouchableOpacity style={styles.btnContainer(btnWidth,btnHeight)} onPress={handlePhoneBtn} >
         <Image source={btnImage} resizeMode='contain'/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer:(btnWidth,btnHeight)=>({
        width:btnWidth,
        height:btnHeight,
        padding:5
    }),
    btnImage:{
        width:'100%',
        height:'100%'
    }
})
export default ChatBtn