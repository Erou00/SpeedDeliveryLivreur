import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const Container = (props) => {
  return (
    <View style={styles.bottomView(props.pad,props.padHor)}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
 
    bottomView : ( pad,padHor )=>({
      // flex:1.5,
      // height:Dimensions.get('window').height- (Dimensions.get('window').height / 4),
      backgroundColor: 'white',
      top:pad,
      borderTopStartRadius:20,
      borderTopEndRadius:20,
      paddingHorizontal:padHor,
      paddingBottom:10
    }),
})

export default Container