import { Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useAuth } from '../context/auth';
import OrderItem from '../component/orderItem';
import { useOrderContext } from '../context/OrderContext';
import { commandes_encours } from './api/axios_command';
import { COLORS, FONT } from '../constants';

const index = () => {
    const {userInfo} = useAuth();

const[orders,setOrders] = useState([])
  const { isLoad,setIsLoad} = useOrderContext()
  const fetchOrders = async() => {
     await commandes_encours(userInfo.id).then(({data})=>{
      setOrders(data.data)
      setIsLoad(false)
      console.log(data);
     }).catch(err => {
      console.log(err);
     })
  };

  useEffect(() => { 
    if (userInfo) {
      fetchOrders()
    }
 
  }, [userInfo,isLoad]);
  return (
    <>
       <Stack.Screen options={{
        headerTitle:"Les nouvelles commandes",
        headerTitleStyle:{
            fontFamily:FONT.bold,
            fontSize:18,
            color:COLORS.gray
        }
    }
         
        } /> 
       <FlatList
            
            data={orders}
            keyExtractor={(item) => item.id}
            style={styles.productList}
            renderItem={( {item }) => <OrderItem  order={item} />}
            contentContainerStyle={{ marginBottom:150,paddingHorizontal: 16, paddingBottom: 100}}
            
           
          />
        
    </>
   
  )
}

const styles = StyleSheet.create({
    productList: {
      flex: 1,
      paddingTop: 14,
    
    },
  
  });

export default index
