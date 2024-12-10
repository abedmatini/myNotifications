Start creating the expo app

npx create-expo-app myNotifications --template blank
cd myNotifications

npx expo install @react-native-firebase/app
npx expo install @react-native-firebase/messaging
npx expo install expo-notifications

npx expo install expo-notifications
npx expo prebuild --platform android

// App.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

const app = initializeApp(firebaseConfig);

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received!', notification);
      alert("There is a notification "+notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Stop here if the user did not grant permission
    if (finalStatus !== 'granted') {
      alert('Notification permissions not granted!');
      return;
    }

    // Get the device token
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);

    // You can send this token to your server or Firebase Cloud Messaging for further processing
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Firebase Messaging App!</Text>
    </View>
  );
};

export default App;


sudo npm install -g eas-cli