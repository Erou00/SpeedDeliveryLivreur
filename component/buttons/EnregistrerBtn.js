import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { COLORS, SIZES, icons } from '../../constants'
import { StyleSheet } from 'react-native'

const EnregistrerBtn = ({handelButton,btnText,btnIcon,isValid}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity disabled={!isValid}
        style={styles.applyBtn(isValid)}
        onPress={handelButton}>
            <Image 
            source={btnIcon}
            resizeMode='contain'
            style={styles.addBtnImage}
            />
        <Text style={styles.applyBtnText}>{btnText}</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      width:'100%',
      height: 80,
      padding: SIZES.small,
      backgroundColor: "#FFF",
      // justifyContent: "space-between",
      // alignItems: "center",
      // flexDirection: "row",
    },
  
    addBtnImage: {
      width: "12%",
      height: "40%",
      tintColor: COLORS.lightWhite,
    },
    applyBtn:(isValid) => ({
      flex: 1.5,
      flexDirection:'row',
      backgroundColor: isValid ? COLORS.primary : '#555',
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      // marginLeft: SIZES.medium,
      borderRadius: SIZES.medium,
    }),
    applyBtnText: {
      fontSize: SIZES.medium,
      color: COLORS.white,
      // fontFamily: FONT.bold,
    },
  
  })
export default EnregistrerBtn