import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function RegisterScreen() {
  const { event } = useLocalSearchParams();
  const [registered, setRegistered] = useState(false);
  const [qrValue, setQrValue] = useState(null);
  const theme = useTheme();
  const router = useRouter();

  // Safely parse event param
  let parsedEvent = null;
  try {
    parsedEvent = typeof event === 'string' ? JSON.parse(event) : event;
  } catch (error) {
    parsedEvent = null;
  }

  useEffect(() => {
    if (parsedEvent?.id) {
      checkRegistration();
    }
  }, [parsedEvent]);

  const checkRegistration = async () => {
    try {
      const registrations = await AsyncStorage.getItem('registrations');
      const regList = registrations ? JSON.parse(registrations) : [];
      if (regList.includes(parsedEvent.id)) {
        setRegistered(true);
        setQrValue(JSON.stringify({ eventId: parsedEvent.id, user: 'Student' }));
      }
    } catch (e) {
      console.error('Error checking registration:', e);
    }
  };

  const handleRegister = async () => {
    try {
      const registrations = await AsyncStorage.getItem('registrations');
      const regList = registrations ? JSON.parse(registrations) : [];
      if (!regList.includes(parsedEvent.id)) {
        regList.push(parsedEvent.id);
        await AsyncStorage.setItem('registrations', JSON.stringify(regList));
      }
      setRegistered(true);
      setQrValue(JSON.stringify({ eventId: parsedEvent.id, user: 'Student' }));
    } catch (e) {
      console.error('Error during registration:', e);
    }
  };

  // ❌ Fallback if no event found
  if (!parsedEvent?.id) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error }}>❌ No event selected!</Text>
        <Button mode="contained" onPress={() => router.back()} style={{ marginTop: 10 }}>
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>{parsedEvent.name}</Text>
      <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
        {parsedEvent.time} | {parsedEvent.venue}
      </Text>

      {!registered ? (
        <Button mode="contained" onPress={handleRegister} buttonColor="#007AFF" textColor="#fff">
          Register
        </Button>
      ) : (
        <View style={styles.qrContainer}>
          <Text style={{ color: theme.colors.text, marginBottom: 10 }}>Scan QR for Check-In</Text>
          <QRCode value={qrValue} size={200} />
        </View>
      )}

      <Button onPress={() => router.back()} style={{ marginTop: 20 }} textColor="#007AFF">
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
});
