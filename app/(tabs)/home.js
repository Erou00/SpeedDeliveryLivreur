
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import MapView , { Marker } from "react-native-maps";

import { Entypo, MaterialIcons } from "@expo/vector-icons";
import OrderItem from '../../component/orderItem';
import { commandes_encours } from "../api/axios_command";
import { Stack } from "expo-router";
import { useAuth } from "../../context/auth";
import { COLORS } from "../../constants";


import { useOrderContext } from '../../context/OrderContext'


 
const home = () => {
 
    const bottomSheetRef = useRef(null);
    const { width, height } = useWindowDimensions();
    const snapPoints = useMemo(() => ["18%", "95%"], []);

  
  
    const[orders,setOrders] = useState([])
    const { userInfo } = useAuth()
    const { isLoad,setIsLoad} = useOrderContext()
    const fetchOrders = async() => {
       await commandes_encours(userInfo.id).then(({data})=>{
        setOrders(data.data)
        setIsLoad(false)
       }).catch(err => {
        console.log(err);
       })
    };
  
    useEffect(() => { 
      if (userInfo) {
        fetchOrders()
      }
   
    }, [userInfo,isLoad]);
  
    useEffect(() => {
  
    }, []);
  
  //   if (!driverLocation) {
  //     return <ActivityIndicator size={"large"} color="gray" />;
  //   }
  
    return (
    <>
    {/* <Stack.Screen options={{headerShown:false}} /> */}
      <Pressable style={{ backgroundColor: "lightblue", flex: 1,marginBottom: 54  }}>
        <MapView 
          style={{
            height,
            width,
          }}
         
          showUserLocation 
          followsUserLocation
        >
  
         {  orders.map( (order) => (
        
            
            <Marker key={order.id} title={order.owner} description={order.address} 
              coordinate={{latitude: order.latitude,longitude: order.longitude}}>
                <View style={{backgroundColor:COLORS.primary,padding:5,borderRadius:20}}>
                    <Entypo name="shop" size={24} color={"white"}/>
                </View>
            </Marker>
          
  
         ))}
          
          
  
        </MapView>
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
          <View style={{ alignItems: "center", marginBottom: 35 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                letterSpacing: 0.5,
                paddingBottom: 5,
              }}
            >
              You're Online
            </Text>
            <Text style={{ letterSpacing: 0.5, color: "grey" }}>
              Available Orders: {orders.length}
            </Text>
          </View>
          <BottomSheetFlatList
            data={orders}
            style={styles.productList}
            renderItem={({ item }) => <OrderItem  order={item} />}
            contentContainerStyle={{ marginBottom:150,paddingHorizontal: 16, paddingBottom: 100}}
            
           
          />
        </BottomSheet>
      </Pressable>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    productList: {
      flex: 1,
      paddingTop: 14,
    
    },
  
  });
export default home
