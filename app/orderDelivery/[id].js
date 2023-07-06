import { Stack, Tabs, useGlobalSearchParams, useNavigation, useSearchParams } from 'expo-router'
import { View, Text, Pressable, useWindowDimensions, ActivityIndicator, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles'
import MapView , { Marker } from "react-native-maps";
import * as Location from 'expo-location' 
import { get_commande_by_id, validate_commande } from '../api/axios_command';

import { FontAwesome5, Fontisto,Entypo,Ionicons } from "@expo/vector-icons";
import MapViewDirections from 'react-native-maps-directions';
import { popupWithBody } from '../../utils/Utils';
import { livreur_location } from '../api/user_auth';
import { useAuth  } from '../../context/auth'
import CustomModal from '../../component/modal/CustomModal';
import BottomSheetDetails from './BottomSheetDetails';

import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import { useOrderContext } from '../../context/OrderContext';

var stompClient =null;

const OrderDelivery = () => {
  const { id } = useGlobalSearchParams();
  const {width,height} = useWindowDimensions()

  const[order,setOrder] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMiniute, setTotalMiniute] = useState(0)
  const [totalKm, setTotalKm] = useState(0)
  const [isDriveClose, setIsDriveClose] = useState(false)
 


  const mapRef = useRef(null);


  const { userInfo } = useAuth();


  ///


 

  // const snapPoints = useMemo(() => ["12%", "95%"], []);

  const updateLivreurLocation = async (lat,long) => {
    await livreur_location(userInfo.id,
      {
        "latitude":lat,
        "longitude":long
      }).then(() =>
      console.log('User location updated'))
    .catch((error) => console.error('Error updating user location:', error));


  }



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        console.log("Nonono");
        return; 
      } 

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
     await updateLivreurLocation(location.coords.latitude,location.coords.longitude)
    })(); 


    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 500,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
        updateLivreurLocation(updatedLocation.coords.latitude,updatedLocation.coords.longitude)
      }
    );

    
  
     return () => foregroundSubscription
    
  }, [])



const getOrder = async(c_id) => { 
  await get_commande_by_id(c_id).then(({data})=>{
    setOrder(data.data);  
  }).catch(err => {
    console.log(console.log(err));
  })
}
  
  useEffect(()=>{
    if (id) {
      console.log('on-load:'+ id);
      getOrder(id)
    }
    
  },[id])
  
  const changeMapRegion = () => {
   
    mapRef.current?.animateToRegion({
      latitude : driverLocation.latitude,
      longitude : driverLocation.longitude, 
      latitudeDelta : 0.01,
      longitudeDelta:0.01,
    });
  
}

useEffect(()=>{
  changeMapRegion()
},[driverLocation])
 

if (!driverLocation || !order ) {
  return (
    <>
      <Tabs.Screen  options={{headerShown:false}} />
      <View style={styles.containerActivityIndicator}>
        <ActivityIndicator size={"large"} color="gray" />
      </View>
    </>
  );
}

  return (

     
    <View style={styles.container}>
        <Tabs.Screen  options={{headerShown:false}} />
        { order && 
         <>
          <MapView
          ref={mapRef}  
          showsUserLocation 
         
          initialRegion={{
            latitude : driverLocation?.latitude,
            longitude: driverLocation?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,

          }} 
          style={{width,height}}
          showUserLocation 
          >
          <MapViewDirections 
            origin={driverLocation}
            destination={{
              latitude : order.latitude,
              longitude : order.longitude,
            }}
            strokeWidth={5}
            strokeColor='#3FC060'  
            

            apikey={"AIzaSyD9ezePR1Xk98ciUaPDQro_yGPkZ6lkt6M"}

            onReady={(result) => {
              if (result.distance <= 0.5) {
                setIsDriveClose(true);
              }else{
                setIsDriveClose(false)
              }
              setTotalMiniute(result.duration); 
              setTotalKm(result.distance); 
            }} 
              
            />   

          <Marker title={'ayoub essahat'} description={order.address} 
                    coordinate={{latitude:order.latitude,longitude:order.longitude}}>
                    <View>
                    <View style={{backgroundColor:'green',padding:5,borderRadius:20}}>
                      <Entypo name="user" size={24} color={"white"}/>
                    </View>
                    </View>
          </Marker> 
 
          </MapView>


            <BottomSheetDetails  isDriveClose={isDriveClose} totalKm={totalKm} order={order}
             totalMiniute={totalMiniute}  pOrder={order} onAccept={changeMapRegion} orderId={order.id}/>
      

           </>
      }

       


     </View>
    
  )
}





export default OrderDelivery
