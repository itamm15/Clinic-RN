import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useGetPatients } from '@/hooks/patient/useGetPatients';

export default function AddPaymentScreen() {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const [patientOpen, setPatientOpen] = useState(false);
  const [patientItems, setPatientItems] = useState<{ label: string; value: number }[]>([]);

  const { patients, loading } = useGetPatients();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setPatientItems(
        patients.map(p => ({
          label: `${p.firstName} ${p.lastName}`,
          value: p.id,
        }))
      );
    }
  }, [patients, loading]);

  const handleSubmit = async () => {
    try {
      const payload = {
        amount: parseFloat(amount),
        paymentDate: new Date(paymentDate).toISOString(),
        description,
        patientId: selectedPatientId,
      };

      const res = await axios.post('http://localhost:5183/api/payment', payload);

      if (res.data === true) {
        console.log('Dodano płatność');
        router.replace('/payments');
      } else {
        console.log('Nie udało się dodać płatności');
      }
    } catch (error) {
      console.log('Błąd API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj płatność</Text>

      <TextInput
        style={styles.input}
        placeholder="Kwota (np. 150.00)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={paymentDate}
        onChangeText={setPaymentDate}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Pacjent</Text>
      <DropDownPicker
        open={patientOpen}
        value={selectedPatientId}
        items={patientItems}
        setOpen={setPatientOpen}
        setValue={setSelectedPatientId}
        setItems={setPatientItems}
        placeholder="Wybierz pacjenta"
        zIndex={1000}
        zIndexInverse={1000}
        style={styles.dropdown}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Dodaj płatność</Text>
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
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  dropdown: {
    marginBottom: 16,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
