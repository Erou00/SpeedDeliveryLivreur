import { View, Text, StyleSheet,Image , TextInput, ScrollView, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT, SIZES, icons, images } from '../../constants'

import { useRouter } from 'expo-router'
import { ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { useAuth } from '../../context/auth'
import { get_commandes } from '../api/axios_command'
import Commande from '../../component/commande'


const history = () => {
    const[commandes,setCommandes] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
  
  
    const [value, setValue] = useState('');
    const [searchText,setSearchText] = useState('');
  
  
    const [selectedCommandes,setSelectedCommandes] = useState(null);
  
  
    const [isLoading, setIsLoading] = useState(true);
  
  
    const { userInfo } = useAuth()
    const router = useRouter();
  
    const getCommandes = async (pageNumber) => {
  
        await get_commandes(4,searchText,'',pageNumber)
          .then(({data})=>{
             setCommandes([...commandes,...data.data.content])
             setTotalPages(data.data.totalPages)
             setCurrentPage(currentPage+1); 
  
          }) 
          .catch(err => {console.log(err);})
          .finally(()=>{
            setIsLoading(false);
          })
  
    }
  
  
    const handleCardPress = (item) => {
        router.push(`commandes/detail-Commandes/${item.id}`)
        setSelectedCommandes(item.id)
      
    }
  
    const handleEndReached = () => {
    
      let numPage = currentPage+1
      if (numPage <= totalPages ) {
        setCurrentPage(currentPage+1)    
        getCommandes(currentPage)  
      }
      console.log('outside + '+ currentPage +" total :" + totalPages);
    };
  
    const handleDoneButtonPress = () => {
      setCommandes([])
      setIsLoading(true)
      setCurrentPage(0);
      setSearchText(value);
      console.log(currentPage);
  
    };
  
    const deleteCommande = async (id) => {
    //    await delete_commande_by_id(id).then(({data})=>{
    //     if (data.status === 200) {
    //       setCommandes((prevData) => prevData.filter((obj) => obj.id !== id));
    //     }
    //   }).catch(err => console.log(err)).finally(()=>{
    //   })
    }
    
    useEffect(()=>{
      getCommandes(currentPage)
    },[searchText])
  
  
  
    const renderFooter = () => {
      if (!isLoading) return null;
      return (
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          <ActivityIndicator size="large" />
        </View>
      );
    };
  
    return(
      
      <SafeAreaView style={{flex:1,backgroundColor: '#E6E6E6',marginTop:25}}>
         <ImageBackground  source={images.menuBg}
            style={{height: Dimensions.get('window').height / 6}} resizeMode='cover'
            >
  
            
                <View style={styles.brandView}>         
                <Text style={styles.brandViewText}>COMMANDES</Text>
                </View>
                
          </ImageBackground>
  
          <View style={styles.bottomView}>
              <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>  
                <TextInput
                    style={styles.searchInput}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    onSubmitEditing={handleDoneButtonPress} 
  
                    placeholder="Chercher par address"
                    
                  />
              </View>
              <TouchableOpacity style={styles.searchBtn} 
                  onPress={()=>{router.push('commandes/ajouter-commande')}}>
                    <Image 
                      source={icons.add}
                      resizeMode='contain'
                      style={styles.searchBtnImage}
                    />
                  </TouchableOpacity>
              </View>
            </View>
       
           
            
              
           
      <View style={styles.container}>
        <FlatList
          
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          onEndReachedThreshold={0.1}
          onEndReached={handleEndReached}
          data={commandes}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />
          }}
          renderItem={commande => {
            const item = commande.item
            return (
              <Commande  item={item} deleteCommande={deleteCommande} />
             
            )
          }}
           ListFooterComponent={renderFooter}
          />
          </View>
              
         
            
  
     
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    brandView : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  
    },
  
    brandViewText:{
      color:'#fff',
      fontSize:30,
      fontWeight:'bold',
      textTransform : 'uppercase',
      fontStyle:'italic',
    
    },
  
    bottomView:{
      // flex:1.5,
      // height:Dimensions.get('window').height- (Dimensions.get('window').height / 4),
      backgroundColor: 'white',
      top:-20,
      borderTopStartRadius:20,
      borderTopEndRadius:20,
      padding:5
    },
  
    searchContainer :{justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: SIZES.xSmall,
      height: 40,
    },
  
    searchWrapper: {
      flex: 1,
      backgroundColor: COLORS.white,
      marginRight: SIZES.small,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: SIZES.medium,
      height: "100%",
    },
  
    searchInput: {
      fontFamily: FONT.regular,
      width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.medium,
    },
  
    searchBtn: {
      width: 40,
      height: "100%",
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
    },
  
    searchBtnImage: {
      width: "50%",
      height: "50%",
      tintColor: COLORS.white,
    },
    cardsContainer:{
  
      // marginTop:55,
      flexDirection:'row',
      // // flex:1,
      // flexWrap: 'wrap',
  
      // alignItems: 'center'
    },
  
  
    container: {
      flex: 1,
      marginTop: -12,
      
    },
    list: {
      paddingHorizontal: 5,
      backgroundColor: '#E6E6E6',
      marginBottom:80

    },
    listContainer: {
      // marginTop:10,
      // alignItems: 'center',
    },
    separator: {
      marginTop: 2,
    },
  
  })

export default history
