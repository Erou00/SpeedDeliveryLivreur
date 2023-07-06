import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import Pusher from 'pusher-js';
import { useEffect } from "react";
import { useAuth } from "./auth";



const OrderContext = createContext({})

export const OrderProvider = ({children}) => {
   
    const [isLoad,setIsLoad] = useState(true)
    const [order,setOrder] = useState({})
    
    const {  userInfo } = useAuth()
    useEffect(() => {
      if (userInfo) {
        const pusher = new Pusher('ad7757b9128362fb10c9', {
          cluster: 'eu',
          encrypted: true,
        });
    
        const channel = pusher.subscribe("order-channel");
        channel.bind("order-affected-"+userInfo.id, (data) => {
          // Method to be dispatched on trigger.'
          if (data) {
            console.log(data);
            setIsLoad(true)
          } 
          console.log(data);
        });

        return () => {
          pusher.unsubscribe('order-channel');
        };

      }
        
    
       
      }, [userInfo]);

    return (
        <OrderContext.Provider value={{isLoad,setIsLoad}}>
          {children}
        </OrderContext.Provider>
    )

}

export const useOrderContext = () => useContext(OrderContext);
