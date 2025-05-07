import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useGetPatients } from '@/hooks/patient/useGetPatients';
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors';

export default function AddPrescriptionScreen() {
  const [description, setDescription] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientItems, setPatientItems] = useState<{label: string, value: number}[] | []>([]);
  const [doctorItems, setDoctorItems] = useState<{label: string, value: number}[] | []>([]);

  const { patients, loading: loadingPatients } = useGetPatients();
  const { doctors, loading: loadingDoctors } = useGetDoctors();
  const router = useRouter();

  useEffect(() => {
    if (!loadingPatients) {
      setPatientItems(patients.map(p => ({
        label: `${p.firstName} ${p.lastName}`,
        value: p.id,
      })));
    }

    if (!loadingDoctors) {
      setDoctorItems(doctors.map(d => ({
        label: `Dr. ${d.name} ${d.lastName}`,
        value: d.id,
      })));
    }
  }, [patients, doctors, loadingPatients, loadingDoctors]);


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5183/api/prescription', {
        description,
        issuedAt: new Date(issuedAt).toISOString(),
        patientId: selectedPatientId,
        doctorId: selectedDoctorId,
      });

      if (response.data === true) {
        router.replace('/prescriptions');
      } else {
        Alert.alert('Błąd', 'Nie udało się dodać recepty');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Błąd połączenia z API');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj receptę</Text>

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Opis recepty"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Data wystawienia (YYYY-MM-DD)"
        value={issuedAt}
        onChangeText={setIssuedAt}
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
        zIndex={2000}
        zIndexInverse={2000}
        style={styles.dropdown}
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
        <Text style={styles.buttonText}>Dodaj receptę</Text>
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
