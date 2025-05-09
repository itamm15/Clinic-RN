import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function EditPatientScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5183/api/patient/${id}`).then(res => {
      const patient = res.data;
      setFirstName(patient.firstName);
      setLastName(patient.lastName);
      setEmail(patient.email);
      setAddress(patient.address);
      setPhoneNumber(patient.phoneNumber.toString());
      setDateOfBirth(patient.dateOfBirth.slice(0, 10));
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5183/api/patient/${id}`, {
        firstName,
        lastName,
        email,
        address,
        phoneNumber: phoneNumber,
        dateOfBirth: new Date(dateOfBirth).toISOString()
      });

      console.log('Zaktualizowano pacjenta');
      router.replace('/patients');
    } catch (error) {
      console.error('Błąd przy aktualizacji pacjenta:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5183/api/patient/${id}`);
      console.log('Pacjent usunięty');
      router.replace('/patients');
    } catch (error) {
      console.error('Błąd przy usuwaniu pacjenta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edytuj pacjenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Data urodzenia (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Zapisz zmiany</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Usuń pacjenta</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
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
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
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
