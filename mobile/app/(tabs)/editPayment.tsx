import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPatients } from '@/hooks/patient/useGetPatients';

export default function EditPaymentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const [patientOpen, setPatientOpen] = useState(false);
  const [patientItems, setPatientItems] = useState<{ label: string; value: number }[]>([]);

  const { patients, loading: loadingPatients } = useGetPatients();

  useEffect(() => {
    axios.get(`http://localhost:5183/api/payment/${id}`).then((res) => {
      const data = res.data;
      setAmount(data.amount.toString());
      setIssuedAt(data.paymentDate.slice(0, 10));
      setDescription(data.description || '');
      setSelectedPatientId(data.patient.id);
    });
  }, [id]);

  useEffect(() => {
    if (!loadingPatients) {
      setPatientItems(
        patients.map(p => ({
          label: `${p.firstName} ${p.lastName}`,
          value: p.id,
        }))
      );
    }
  }, [patients, loadingPatients]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5183/api/payment/${id}`, {
        amount: parseFloat(amount),
        paymentDate: new Date(issuedAt).toISOString(),
        description,
        patientId: selectedPatientId,
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
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  dropdown: {
    marginBottom: 16,
    borderColor: '#ccc',
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
