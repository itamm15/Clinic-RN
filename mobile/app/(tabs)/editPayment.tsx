import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function EditPaymentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5183/api/payment/${id}`).then((res) => {
      const data = res.data;
      setAmount(data.amount.toString());
      setIssuedAt(data.paymentDate.slice(0, 10));
      setDescription(data.description || '');
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5183/api/payment/${id}`, {
        amount: parseFloat(amount),
        issuedAt: new Date(issuedAt).toISOString(),
        description,
      });

      console.log('Zaktualizowano płatność');
      router.replace('/payments');
    } catch (error) {
      console.log('Błąd przy aktualizacji:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5183/api/payment/${id}`);
      console.log('Płatność usunięta');
      router.replace('/payments');
    } catch (error) {
      console.log('Błąd przy usuwaniu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edytuj płatność</Text>

      <TextInput
        style={styles.input}
        placeholder="Kwota"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={issuedAt}
        onChangeText={setIssuedAt}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Zapisz zmiany</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Usuń płatność</Text>
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
  multiline: {
    height: 80,
    textAlignVertical: 'top',
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
