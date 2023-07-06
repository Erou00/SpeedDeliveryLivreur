import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT } from '../../constants';
import LoginBtn from '../../component/buttons/LoginBtn';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { user_login } from '../api/user_auth';
import { useAuth } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');


    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [message,setMessage] = useState('');

    const router = useRouter();

    const { user,signIn } = useAuth();

    const onSubmit = async () => {
        const payload = {
            username: username,
            password: password,
            grantType:'password',
            withRefreshToken:true,
        }

       await user_login(payload)
        .then((data)=> {
            console.log(data);
            if (data.status === 401) {
                setMessage(data.message);
            }else{
            //  console.log(data.data.accessToken);
             signIn(data.data.accessToken);
            }
          
        })
        .catch(err => {
            console.log(err);
        })
    }


    useEffect(()=>{
        console.log(user);
    },[])
    if (user) {
        <Redirect  href='/home' />
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Tabs.Screen  options={{headerShown:false}}/>
            <View style={{ flex: 1,}}>
              <View style={styles.avatarContainer}>
                  <Image
            
                    style={styles.avatar}
                    source={{uri: 'https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg'}}
                  resizeMode='stretch'
                  />
                </View>
               <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginVertical: 12, marginHorizontal: 22  }}>
                    {message !== '' &&
                      <Text 
                      style={styles.errMsg}>{message}</Text>
                    }
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        fontFamily:FONT.bold

                    }}>Username</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        
                    }}>
                        <TextInput
                            value={username}
                            onChangeText={(text) => {setUsername(text)}}
                            placeholder='Username'
                            placeholderTextColor={COLORS.black}
                            style={{
                                width: "100%",
                                fontFamily:FONT.bold
 
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12, marginHorizontal: 22  }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        fontFamily:FONT.bold

                    }}>Mot de passe</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center", 
                        paddingLeft: 22
                    }}>
                        <TextInput
                            value={password}
                            onChangeText={(text) => {setPassword(text)}}
                            placeholder='Enter votre mot de passe'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                fontFamily:FONT.bold

                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6,
                    marginHorizontal: 22 
                }}>
                   

    
                </View>

                <LoginBtn
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                        marginHorizontal: 22 ,
                        
                    }}

                    onPress={onSubmit}
                />

                



                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: 10,
    alignItems: 'center',

    width: "100%",
    height: 180,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    position:'relative',
  },
  avatar: {
    position:'absolute',
    width: "100%",
    height: "100%",
    // borderRadius: 50,
  },

  errMsg:{

        fontSize:18,
        color:'red',
        fontFamily:FONT.bold,
        textAlign:'center'

  }

});
export default Login