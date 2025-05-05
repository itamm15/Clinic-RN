import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGetSpecializations } from '@/hooks/specialization/useGetSpecializations';

export default function AddDoctorScreen() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [open, setOpen] = useState(false);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);
  const [items, setItems] = useState<{ label: string; value: number }[]>([]);

  const { specializations, loading } = useGetSpecializations();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setItems(specializations.map(s => ({ label: s.name, value: s.id })));
    }
  }, [specializations, loading]);

  const handleSubmit = async () => {
    if (!selectedSpecId) {
      Alert.alert('Błąd', 'Wybierz specjalizację');
      return;
    }

    await axios.post('http://localhost:5183/api/doctor', {
      name,
      lastName,
      email,
      specializationId: selectedSpecId,
      dateOfBirth: new Date(dateOfBirth).toISOString(),
    });

    router.replace('/doctors');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dodaj nowego lekarza</Text>

      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={lastName}
        onChangeText={setLastName}
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
        placeholder="Data urodzenia (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />

      <Text style={styles.label}>Specjalizacja</Text>
      <DropDownPicker
        open={open}
        value={selectedSpecId}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedSpecId}
        setItems={setItems}
        placeholder="Wybierz specjalizację"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={1000}
        zIndexInverse={1000}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Dodaj lekarza</Text>
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
    zIndex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  dropdown: {
    borderColor: '#ccc',
    marginBottom: 16,
  },
  dropdownContainer: {
    borderColor: '#ccc',
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
