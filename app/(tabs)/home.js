
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import MapView , { Marker } from "react-native-maps";

import { Entypo, MaterialIcons } from "@expo/vector-icons";
import OrderItem from '../../component/orderItem';
import { commandes_encours } from "../api/axios_command";
import { Stack, Tabs, useRouter } from "expo-router";
import { useAuth } from "../../context/auth";
import { COLORS } from "../../constants";


import { useOrderContext } from '../../context/OrderContext'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Button } from "react-native";
import { livreur_expoToken } from "../api/user_auth";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
 
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

 
const home = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  const {userInfo} = useAuth();

  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // router.push('/not')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const setExpoToken = async() => {
     if (expoPushToken !== userInfo.expToken) {
      await livreur_expoToken(userInfo.id,expoPushToken).then(({data}) => {
       
      }).catch(err => console.log(err))
     }
  }

  useEffect(()=>{
    if (userInfo) {
      setExpoToken() 
    } 
  },[userInfo,expoPushToken])



  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const snapPoints = useMemo(() => ["18%", "95%"], []);



  const[orders,setOrders] = useState([])
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