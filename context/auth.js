import { useRouter, useSegments } from "expo-router";
import jwtDecode from "jwt-decode";
import React from "react";
import { livreur_details, user_info } from "../app/api/user_auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/home");
    }
  }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);
  const [username,setUsername] = React.useState(null);
  const [userInfo,setUserInfo] = React.useState(null);
  const [userDetails,setUserDetails] = React.useState([]);

  useProtectedRoute(user);


  _verifyToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        setAuth(value)
        decodeToken(value) 
    
      }else{
        setAuth(null)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const decodeToken =async (userToken)=>{
    const token = userToken;
    const decodedToken = jwtDecode(token);

    await  _get_userinfo(decodedToken.sub)
    setUsername(decodedToken.sub);
    

  }

  const signIn = async (token) => {
    // const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem('@user',token)
    setAuth(token)
    decodeToken(token)
    console.log(username);
  }
  const signOut = async () => {
    await AsyncStorage.removeItem('@user')
    // logToken()
    setAuth(null)

  }

  const _get_userinfo = async (name) => {
  
    await  user_info(name)
            .then(({data})=>{ 
              console.log(data); 
              setUserInfo(data.data);
            }).catch(err => {
              console.log(err);
            })
  }

  const _get_userdetails = async (id) => {

    await livreur_details(id)
    .then(({data})=>{
      setUserDetails(data.data)
    })
    .catch(err => {
      console.log(err);
    })


  }



  React.useEffect(()=>{
    _verifyToken()
    // _get_userinfo(username)
  
  },[])

  useEffect(()=>{
    if (userInfo) {
      _get_userdetails(userInfo.id)
    }
  },[userInfo])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        _get_userinfo,
        user,
        username,
        userInfo,
        userDetails
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}