

import { Slot, Stack} from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Provider, useAuth } from '../context/auth'
import { PanGestureHandler } from 'react-native-gesture-handler'
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';
import { OrderProvider } from '../context/OrderContext'
import { useNotificationObserver } from '../hooks/useNotifications'
//import { useRouterNotifications } from '../hooks/useNotifications'


SplashScreen.preventAutoHideAsync()
const _layout = () => { 
  // useRouterNotifications()

  useNotificationObserver();
  const [fontsLoaded] = useFonts({
    DMBold : require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium : require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular : require('../assets/fonts/DMSans-Regular.ttf'),
    chelseaMarket : require('../assets/fonts/chelsea-market-regular.ttf'),
    
  })



  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }

  },[fontsLoaded])

  if (!fontsLoaded) return null;


  return (
    <Provider>
      <OrderProvider>
        <PopupRootProvider>
          <Stack initialRouteName='home'>
            <Stack.Screen  name='(tabs)' options={{headerShown:false}}/>
          </Stack>
        </PopupRootProvider>
      </OrderProvider>
    </Provider>
  ) 
}

export default _layout