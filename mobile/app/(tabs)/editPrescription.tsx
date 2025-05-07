import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPatients } from '@/hooks/patient/useGetPatients';
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors';

export default function EditPrescriptionScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientItems, setPatientItems] = useState<{ label: string; value: number }[]>([]);
  const [doctorItems, setDoctorItems] = useState<{ label: string; value: number }[]>([]);

  const { patients, loading: loadingPatients } = useGetPatients();
  const { doctors, loading: loadingDoctors } = useGetDoctors();

  useEffect(() => {
    axios.get(`http://localhost:5183/api/prescription/${id}`).then(res => {
      const data = res.data;
      setDescription(data.description);
      setIssuedAt(data.issuedAt.slice(0, 10));
      setSelectedPatientId(data.patient.id);
      setSelectedDoctorId(data.doctor.id);
    });
  }, [id]);

  useEffect(() => {
    if (!loadingPatients) {
      setPatientItems(patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p.id })));
    }
    if (!loadingDoctors) {
      setDoctorItems(doctors.map(d => ({ label: `Dr. ${d.name} ${d.lastName}`, value: d.id })));
    }
  }, [patients, doctors, loadingPatients, loadingDoctors]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5183/api/prescription/${id}`, {
        description,
        issuedAt: new Date(issuedAt).toISOString(),
        patientId: selectedPatientId,
        doctorId: selectedDoctorId,
      });
      router.replace('/prescriptions');
    } catch (error) {
      console.error('Błąd podczas aktualizacji:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5183/api/prescription/${id}`);
      router.replace('/prescriptions');
    } catch (err) {
      console.error('Błąd podczas usuwania:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edytuj receptę</Text>

      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Opis recepty"
      />

      <TextInput
        style={styles.input}
        value={issuedAt}
        onChangeText={setIssuedAt}
        placeholder="Data (YYYY-MM-DD)"
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

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Zapisz zmiany</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Usuń receptę</Text>
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
    marginBottom: 12,
  },
  multiline: { height: 80, textAlignVertical: 'top' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  dropdown: { marginBottom: 16, borderColor: '#ccc' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
