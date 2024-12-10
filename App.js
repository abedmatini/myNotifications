import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// Set notification handler for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [notificationPermission, setNotificationPermission] = useState(false);

  // Request permission for notifications on app load
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Function to request notification permissions
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      setNotificationPermission(newStatus === 'granted');
    } else {
      setNotificationPermission(true);
    }
  };

  // Function to send a notification
  const sendNotification = async () => {
    if (!notificationPermission) {
      Alert.alert('Permission not granted', 'Please allow notifications to receive alerts.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello! 📬",
        body: "This is a test notification",
        sound: true,
      },
      trigger: { seconds: 2 }, // Notification will appear after 2 seconds
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable 
      style={{'backgroundColor':'purple',
              'borderRadius':10,
              'margin':10,
              'padding':15}}
       onPress={sendNotification}>
      <Text style={{'color':'white'}}>Send Notification</Text>
      </Pressable>
    </View>
  );
}