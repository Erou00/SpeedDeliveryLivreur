import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

export const  useNotificationObserver = () => {
  useEffect(() => {
    let isMounted = true;

    const redirect = (notification) => {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push('/');
      }

      router.push('/');
   
    }

    Notifications.getLastNotificationResponseAsync()
      .then(response => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response?.notification);
      });

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}