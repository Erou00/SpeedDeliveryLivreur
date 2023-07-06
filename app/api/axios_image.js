import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";

export const get_image = async (imageName) => {
    try {

        const token = await AsyncStorage.getItem("@user")
      const baseUrl = `/private/file-name/${imageName}`;
     
      const result = await ApiManager(baseUrl, {
        method: 'GET',
        //  withCredentials:true,
        responseType: 'blob',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`
        },
      });
      return result;
    } catch (error) {
      return error.response.data;
    }
  };