import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function AddPatientScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5183/api/patient', {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        address,
      });

      if (response.data === true) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDateOfBirth('');
        setAddress('');

        router.replace('/patients');
      } else {
        Alert.alert('Błąd', 'Nie udało się dodać pacjenta.');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił problem podczas zapisu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj pacjenta</Text>

      <TextInput style={styles.input} placeholder="Imię" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nazwisko" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Telefon" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Data urodzenia (YYYY-MM-DD)" value={dateOfBirth} onChangeText={setDateOfBirth} />
      <TextInput style={styles.input} placeholder="Adres" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Dodaj pacjenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
