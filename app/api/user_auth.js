import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";


export const user_login = async data => {

  try {
    const result = await ApiManager('/public/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }

};


export const user_info = async (username) => {

try {
  console.log(username);
  const token = await AsyncStorage.getItem("@user")
  const result = await ApiManager(`/private/livreurs/userinfo?username=${username}`,{
    method:'GET',
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`
    },
    // params:'hamza'
  })
 
  
  return result;
} catch (error) {
  return error;
}

}

export const livreur_details =  async(id) => {

  try {
    const token = await AsyncStorage.getItem("@user")
    const result = await ApiManager(`/private/livreurs/details?id=${id}`,{
      method:'GET',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`
      },
      // params:'hamza'
    })
   
   
    return result;
  } catch (error) {
   
    return error;
  }

}



export const livreur_location = async (id,data) => {
   console.log(data);
   try {
    const token = await AsyncStorage.getItem("@user")
    const result = await ApiManager(`/private/livreurs/location/${id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }

};