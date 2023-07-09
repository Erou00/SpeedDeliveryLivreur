import { Tabs } from "expo-router"
import { View } from "react-native"
import { Entypo,AntDesign,Fontisto } from '@expo/vector-icons';
import { Text } from "react-native";
import { COLORS, FONT } from "../../constants/theme";


export default () => {

    const screenOptions = {
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
          background: "#fff"
        }
      }

    return (
        <Tabs  initialRouteName="home" screenOptions={screenOptions}>
           
            <Tabs.Screen name="home"  options={{
             tabBarIcon: ({focused})=>{
              return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Entypo name="home" size={24} color={focused ? COLORS.primary: COLORS.gray2} />
                <Text style={{ color: focused ? COLORS.primary: COLORS.gray2,fontFamily:FONT.bold}}>
                 Acceuil</Text>
              </View>
                )
              }
            }}/>
            
            <Tabs.Screen name="history" options={{
             tabBarIcon: ({focused})=>{
              return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <Fontisto name="history" size={24} color={focused ? COLORS.primary: COLORS.gray2} />
                <Text style={{ color:focused ? COLORS.primary: COLORS.gray2,fontFamily:FONT.bold}}>Historique</Text>
              </View>
                )
              }
            }} />
            {/* <Tabs.Screen name="statistique"  options={{
             tabBarIcon: ({focused})=>{
              return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <AntDesign name="piechart" size={24} color={focused ? COLORS.primary: COLORS.gray2} />
                <Text style={{ color: focused ? COLORS.primary: COLORS.gray2,fontFamily:FONT.bold}}>Statistique</Text>
              </View>
                )
              }
            }}/> */}
            <Tabs.Screen name="profile"  options={{
             tabBarIcon: ({focused})=>{
              return (
              <View style={{alignItems: "center", justifyContent: "center"}}> 
                <AntDesign name="profile" size={24} color={focused ? COLORS.primary: COLORS.gray2} />
                <Text style={{ color:focused ? COLORS.primary: COLORS.gray2,fontFamily:FONT.bold}}>Profile</Text>
              </View>
                )
              }
            }}/>
        </Tabs>
    )
}