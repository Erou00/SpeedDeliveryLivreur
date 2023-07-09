import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import ShowImage from '../image/ShowImage';
import { useRouter } from 'expo-router';


const OrderItem = ({order}) => { 
  const router = useRouter();

    return (
       
      <Pressable style={styles.productCard} onPress={() =>{ router.push(`/orderDelivery/${order.id}`)}}>
      <ShowImage  imageName={order.pack.image} imageStyle={styles.productImage}  />
      <View style={styles.productInfo}>                 
 
          <Text style={styles.productName}>{order.owner}</Text>
         
          <View style={{flexDirection:'row'}}>
             <FontAwesome5 name="user-tag" size={18} color="grey" style={{marginRight:4}} />                
             <Text style={styles.productDescription}>{order.owner}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
             <FontAwesome name="phone-square" size={18} color="grey" style={{marginRight:4}} />                
             <Text style={styles.productDescription}>{order.phone}</Text>
          </View>

          <View style={{flexDirection:'row'}}>
             <FontAwesome5 name="map-marker-alt" size={18} color="grey" style={{marginRight:4}} />                
             <Text numberOfLines={2} style={styles.productDescription}>{order.address}</Text>
          </View>

          <Text style={styles.productPrice}>{order.price.toFixed(2)} <Text style={styles.productPriceText}> MAD</Text></Text>
        
       
       
      </View>

     
      {/* <View style={styles.productAmount}>
        <TouchableOpacity style={styles.amountButton} onPress={onDecrement}>
          <Text style={styles.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.amountText}>{item.amount}</Text>
        <TouchableOpacity style={styles.amountButton} onPress={onIncrement}>
          <Text style={styles.amountButtonText}>+</Text>
        </TouchableOpacity>
      </View> */}
    </Pressable>


      );
    };
    
    export default OrderItem;
    
    const styles = StyleSheet.create({
     
      productCard: {

      
        elevation: 20,
        shadowColor: '#52006A',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
       
        padding: 16,
 
        marginVertical:8,


      },
      productImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
      },
      productInfo: {
        flex: 1,
        marginRight: 16,
      },
      productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
      },
      productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
      },
      productPriceText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#666',
      },
      productAmount: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      amountButton: {
        width: 30,
        height: 30,
        backgroundColor: '#ffa726',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      amountButtonText: {
        color: '#fff',
        fontSize: 18,
      },
      amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
      },
      continueButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#4caf50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
      },
      continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });