import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddSpecScreen() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Błąd', 'Podaj nazwę specjalizacji.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5183/api/specialization', {
        name,
      });

      if (response.data === true) {
        setName('');
        router.replace('/specs');
      } else {
        Alert.alert('Błąd', 'Nie udało się dodać specjalizacji.');
      }
    } catch (err) {
      Alert.alert('Błąd', 'Wystąpił problem podczas zapisu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj specjalizację</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa specjalizacji"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Dodaj</Text>
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
