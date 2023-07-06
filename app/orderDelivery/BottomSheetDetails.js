import { Stack, Tabs, useGlobalSearchParams, useNavigation, useSearchParams } from 'expo-router'
import { View, Text, Pressable, useWindowDimensions, ActivityIndicator, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles'
import MapView , { Marker } from "react-native-maps";
import * as Location from 'expo-location' 
import { get_commande_by_id, validate_commande } from '../api/axios_command';

import { FontAwesome5,FontAwesome } from "@expo/vector-icons";
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from '@gorhom/bottom-sheet'
import { popupWithBody } from '../../utils/Utils';
import { livreur_location } from '../api/user_auth';
import { useAuth  } from '../../context/auth'
import CustomModal from '../../component/modal/CustomModal';
import { useOrderContext } from '../../context/OrderContext';


const ORDER_STATUSES = {
    EN_COURS : "EN COURS",
    EN_TRAIN : "EN TRAIN DE LIVREE",
    LIVREE: "LIVREE", 
    RETOUR:"RETOUR"
  };
  

const BottomSheetDetails = ({ totalKm,totalMiniute,isDriveClose,onAccept,pOrder,orderId}) => {


const navigation = useNavigation()

const [alertVisible, setAlertVisible] = useState(false);

const [deliveryStatus, setDeliveryStatus] = useState( 
    ORDER_STATUSES.EN_COURS
    )

const bottomSheetRef = useRef(null);


const { setIsLoad } = useOrderContext()

      
const handelStatus = async (statut,motif) => {
    await validate_commande(orderId,statut,motif).then(({data})=>{
      console.log(data.data);
    }).catch(err => {
      console.log(err);
    })
  } 
  
    const onButtonPressed = async () => {
      if (deliveryStatus === ORDER_STATUSES.EN_COURS) {
        bottomSheetRef.current?.collapse();
         await onAccept()
        setDeliveryStatus(ORDER_STATUSES.EN_TRAIN)
        await handelStatus(ORDER_STATUSES.EN_TRAIN,'')
      }
      if (deliveryStatus === ORDER_STATUSES.EN_TRAIN) {
        setDeliveryStatus(ORDER_STATUSES.EN_TRAIN);
      }
      
  }
  
  const handleConfirm = async (text) => {
    setAlertVisible(false);
    await handelStatus("RETOUR",text)
    navigation.goBack();
    console.warn('Delivery Finished');
  };
  
  const validateOrRefuse = async (statut) => {
      if (statut === 'LIVREE') {
        await handelStatus("LIVREE",'')
        navigation.goBack();
        console.warn('Delivery Finished');
      }
      if (statut === 'RETOUR') { 
        setAlertVisible(true)
      }
      
      setIsLoad(true)
  }

    const renderButtonTitle = () => {
        if (deliveryStatus === ORDER_STATUSES.EN_COURS) {
          return 'Accepter la commande';
        }
        if (deliveryStatus === ORDER_STATUSES.EN_TRAIN) {
          return 'En train de livree';
        }
       
        
      }
      
      const isButtonDisabled = () => {
        if (deliveryStatus === ORDER_STATUSES.EN_COURS) {  
          return false;
        }
       
      
        if (deliveryStatus === ORDER_STATUSES.EN_TRAIN && isDriveClose) {
          return false;
        }
      
        return true;
      }
      
      
      
     
      
  return (
    <>
    <CustomModal
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        onConfirm={handleConfirm}
      />
   
    <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['12%','95%']}
            handleIndicatorStyle={styles.handleIndicator}
            >
            <View style={styles.handleIndicatorContainer}>
                <Text style={styles.routeDetailsText}>
                {totalMiniute.toFixed(1)} min
                </Text>
                <FontAwesome5
                name="shopping-bag"
                size={30}
                color="#3FC060"
                style={{ marginHorizontal: 10 }}
                />
                <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
            </View>

            <View style={styles.deliveryDetailsContainer}>
                <Text style={styles.restaurantName}>{pOrder.owner}</Text>
                <View style={styles.adressContainer}>
                  <FontAwesome name="phone-square" size={22} color="grey" />
                  <Text style={styles.adressText}>{pOrder.phone}</Text>
                </View>

                <View style={styles.adressContainer}>
                  <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
                  <Text style={styles.adressText}>{pOrder.address}</Text>
                </View>

                <View style={styles.orderDetailsContainer}>
                    <Text style={styles.orderItemText} >
                      Qunatite: {pOrder.quantite}
                    </Text>
                    <Text style={styles.orderItemText} >
                      Prix: {pOrder.price} MAD
                    </Text>
                </View>
              </View>

            {!isDriveClose ?
              <TouchableOpacity
                  style={{
                  ...styles.buttonContainer,
                  backgroundColor: isButtonDisabled() ? "grey" : "#3FC060",
                  
                }}
                onPress={onButtonPressed}
                disabled={isButtonDisabled()}    
              >
                  <Text style={styles.buttonText}>
                  {renderButtonTitle()}</Text>
              </TouchableOpacity>
              :
              <View style={styles.validateContainer}>
                <TouchableOpacity
                    style={{
                    ...styles.buttonValidateContainer,
                    backgroundColor:  "#3FC060",
                    
                  }}
                  onPress={() => validateOrRefuse('LIVREE')}
                    
                >
                    <Text style={styles.buttonText}>
                    {'Livree'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                    ...styles.buttonValidateContainer,
                    backgroundColor:"red",
                    
                  }}
                  onPress={() => validateOrRefuse('RETOUR')} 
                >
                    <Text style={styles.buttonText}>
                    {'Retour'}</Text>
                </TouchableOpacity>
              </View>
            }
            </BottomSheet>

            </>
  )
}

export default BottomSheetDetails
