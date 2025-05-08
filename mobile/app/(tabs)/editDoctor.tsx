import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGetSpecializations } from '@/hooks/specialization/useGetSpecializations';

export default function EditDoctorScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [specItems, setSpecItems] = useState<{ label: string; value: number }[]>([]);

  const { specializations } = useGetSpecializations();

  useEffect(() => {
    axios.get(`http://localhost:5183/api/doctor/${id}`).then(res => {
      const d = res.data;
      setName(d.name);
      setLastName(d.lastName);
      setEmail(d.email);
      setSelectedSpecId(d.specialization.id);
    });
  }, [id]);

  useEffect(() => {
    setSpecItems(specializations.map(s => ({ label: s.name, value: s.id })));
  }, [specializations]);

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5183/api/doctor/${id}`, {
      name,
      lastName,
      email,
      specializationId: selectedSpecId
    });

    router.replace('/doctors');
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5183/api/doctor/${id}`);
    router.replace('/doctors');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edytuj lekarza</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Imię" />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Nazwisko" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />

      <Text style={styles.label}>Specjalizacja</Text>
      <DropDownPicker
        open={dropdownOpen}
        value={selectedSpecId}
        items={specItems}
        setOpen={setDropdownOpen}
        setValue={setSelectedSpecId}
        setItems={setSpecItems}
        placeholder="Wybierz specjalizację"
        zIndex={1000}
        zIndexInverse={1000}
        style={styles.dropdown}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Zapisz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Usuń</Text>
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
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  dropdown: { marginBottom: 16, borderColor: '#ccc' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 }
});
