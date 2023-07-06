import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";


export const get_commandes = async(livId,address,pack_id,currentPage)=>{
    try {
      const token = await AsyncStorage.getItem("@user") 
      const baseUrl = "/private/commandes";
      let url = '';
      url = `${baseUrl}/livreur-commands?id=${livId}&address=${address}&packId=${pack_id}&page=${currentPage}&size=6`
  
      console.log(url);
      const result = await ApiManager(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': `Bearer ${token}`
          
        },
        });

      return result;
    
    }  
        catch (error) {
        return error.response.data;
    }
}



export const get_commande_by_id = async (commande_id) => {
  try {
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/commandes";
    let url = '';
    url = `${baseUrl}/${commande_id}`
    

    const result = await ApiManager(url, {
      method: 'GET',
      //  withCredentials:true,
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



export const commandes_encours = async(livId) => {


  try {
    const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/commandes";
      let url = '';
      url = `${baseUrl}/en-cours/${livId}`
      
    const result = await ApiManager(url, {
      method: 'GET',
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


}
  



export const validate_commande = async (commande_id,statut,data) => {

  try {
    console.log('statut:'+ statut );
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/commandes";
    let url = '';
    url = `${baseUrl}/${commande_id}/${statut}` 
    console.log(url); 
    const result = await ApiManager(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`
        
      },
      data:data
    });

    return result;
  } catch (error) {
    return error.response.data;
  }


}
