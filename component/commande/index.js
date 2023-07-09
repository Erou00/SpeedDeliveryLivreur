import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Badge } from '@rneui/themed'
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { COLORS, FONT } from '../../constants'
import Icon from "react-native-vector-icons/Entypo";
import { useRouter } from 'expo-router'
import { popupWithConfirmation } from '../../utils/Utils'




const Commande = ({item,deleteCommande}) => {

  const __getCompletedIcon = item => {

     if (item.statut.statut == "NOUVELLE" || item.statut.statut == "EN COURS") {
      return  <Badge value={'En cours'} status="warning" 
        textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
        containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
        badgeStyle={{width:80,height:30}}
      />
    } else if (item.statut.statut == "EN TRAIN DE LIVREE" ) {
      
      return <Badge value={item.statut.statut} status="primary" 
          textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
          containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
          badgeStyle={{width:200,height:30}}
      />
    } else if (item.statut.statut == "LIVREE" ) {
      
      return <Badge value={item.statut.statut} status="success" 
          textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
          containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
          badgeStyle={{width:80,height:30}}
      />
    } else if (item.statut.statut == "RETOUR" ) {

      return <Badge value={item.statut.statut} status="error"
       textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
       containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
       badgeStyle={{width:80,height:30}}
       />
    }

  }


  const deleteFunc = () => {
    deleteCommande(item.id)
 }

  const router = useRouter()
  return (
    <TouchableOpacity style={styles.cardContainer}
      onPress={()=> router.push(`commandes/detail-commande/${item.id}`)}>
            <View style={styles.cardHeader}>
              {__getCompletedIcon(item)}
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.colisText}>COLIS: {item.pack.name} </Text>


                <View style={styles.phone}>
                <FontAwesome5 name="user-tag" style={styles.icon1}/>
                <View>
                    <Text style={styles.phoneText}>{item.owner}</Text>
                </View>
                </View>
                
                <View style={styles.phone}>
                <FontAwesome name="phone-square" style={styles.icon1}/>
                <View>
                    <Text style={styles.phoneText}>{item.phone}</Text>
                </View>
                </View>

                <View style={styles.address}>
                <Icon name="location" style={styles.icon1}></Icon>
                <View>
                    <Text numberOfLines={3} style={styles.addressText}>{item.address} </Text>
                </View>
                </View>

                <View style={styles.cardBottom}>
                <View>
                    <Text style={styles.qte}>QTE: {item.quantite}</Text>
                    <Text style={styles.price}>PRIX: {item.price} DH</Text>
                </View>
                
                {/* <View>
                <TouchableOpacity onPress={()=> router.push({ pathname: 'commandes/ajouter-commande',params : {id : item.id}})}
                style={styles.socialBarButton}
                >
                <FontAwesome name="edit" size={24} color={COLORS.primary} />
                
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                        popupWithConfirmation(deleteFunc)
                        }
                        }>
                    <Entypo name="trash" size={24} color="black" />
                </TouchableOpacity>
                </View> */}
                
                </View>
            
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginVertical: 8,
      backgroundColor: 'white',
      flexBasis: '48%',
      marginHorizontal: 5,
      borderRadius: 10,
    },
    cardHeader:{
      paddingHorizontal:5,
      paddingVertical:5,
     
    },
    // state:{
    //   textAlign:'right',
    //   fontWeight:'bold',
      
    
    // },
    cardBody:{
      padding:2
    },
    colisText:{
      fontFamily:FONT.chelseaMarket,
      // fontWeight:'bold',
      color:COLORS.primary,
      fontSize:14,
      textAlign:'center',
      textTransform:"uppercase",
      marginBottom:8
    },
    address:{
      flexDirection:"row",
      justifyContent:"flex-start", 
       paddingHorizontal:14,
      marginTop:3
    },
    addressText:{
      flex:0,
      fontFamily:FONT.chelseaMarket,
      paddingEnd:5
    },
    phone:{
      flexDirection:"row",
      justifyContent:"flex-start", 
      paddingHorizontal:14,
      marginTop:3
    },
    phoneText:{
      flex:0,
      fontFamily:FONT.chelseaMarket,
    },
    icon1: {
      color: "rgba(128,128,128,1)",
      fontSize: 18,
      fontWeight:'bold',
      height: 23,
      width: 20,
      marginRight:8,
    },
    cardBottom:{
      flexDirection:"row",
      justifyContent:"space-between", 
      alignItems:"center",
  
      paddingHorizontal:18,
      marginTop:10
    },
    qte: {
      fontFamily: FONT.chelseaMarket,
      color: "#121212",
      fontSize: 14
    },
    price: {
      fontFamily: FONT.chelseaMarket,
      color: "#121212",
      fontSize: 14
    }
  
  });

export default Commande