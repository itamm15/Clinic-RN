import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors';

export default function AddExaminationScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const [doctorOpen, setDoctorOpen] = useState(false);
  const [doctorItems, setDoctorItems] = useState<{ label: string; value: number }[]>([]);

  const { doctors, loading } = useGetDoctors();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setDoctorItems(
        doctors.map(d => ({
          label: `Dr. ${d.name} ${d.lastName}`,
          value: d.id
        }))
      );
    }
  }, [doctors, loading]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5183/api/examination', {
        name,
        description,
        doctorId: selectedDoctorId
      });

      console.log('Dodano badanie');
      router.replace('/examinations');
    } catch (error) {
      console.error('Błąd podczas dodawania badania:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj badanie</Text>

      <TextInput
        style={styles.input}
        placeholder="Nazwa badania"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Lekarz</Text>
      <DropDownPicker
        open={doctorOpen}
        value={selectedDoctorId}
        items={doctorItems}
        setOpen={setDoctorOpen}
        setValue={setSelectedDoctorId}
        setItems={setDoctorItems}
        placeholder="Wybierz lekarza"
        zIndex={1000}
        zIndexInverse={1000}
        style={styles.dropdown}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Dodaj badanie</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#f8f9fa', minHeight: '100%' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12
  },
  multiline: { height: 80, textAlignVertical: 'top' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  dropdown: { marginBottom: 16, borderColor: '#ccc' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
