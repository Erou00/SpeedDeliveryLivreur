import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { COLORS, images } from '../../constants'
import { Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/auth'


const Header = ({bg,headerWidth,title,subTitle,textSize}) => {
 const { signOut } = useAuth();
  return (
    <ImageBackground  source={bg}
    style={{height: Dimensions.get('window').height / headerWidth}} resizeMode='stretch'
    >
      
      <View style={styles.brandView}>         
      <Text style={styles.brandViewText(textSize)}>{title}</Text>
       <Text
            style={{color:'white',fontStyle:'italic',fontSize:18 ,fontWeight:'bold'}}>{subTitle}
            </Text>
      </View>
        
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    brandView : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  
    },
    brandViewText:(textSize)=>({
      color:'#fff',
      fontSize:textSize,
      fontWeight:'bold',
      textTransform : 'uppercase',
      fontStyle:'italic',
    
    }),
})
export default Header