import React from "react";
import { APPOINTMENTS } from "@/constants/Appointments";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const DOCTORS = [
  { id: 1, person: 'Dr. Krzysztof Zjadek', title: 'Kardiolog' },
  { id: 2, person: 'Dr. Karina Wojska', title: 'Neurolog' },
  { id: 3, person: 'Dr. Karol Poss', title: 'Ortopeda' },
  { id: 4, person: 'Dr. Karol Wojteka', title: 'Stomatolog' },
  { id: 5, person: 'Dr. Magdalena Kowalska', title: 'Diabetolog' },
  { id: 6, person: 'Dr. Szymon Szczepała', title: 'Pediatra' },
];

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const appointment = APPOINTMENTS.find((appointment) => appointment.id === Number(id));
  const doctor = DOCTORS.find((d) => d.id === appointment?.doctorId);

  if (!appointment) return;

  useEffect(() => {
    navigation.setOptions({
      title: `Informacje o wizycie nr. ${appointment.id}`,
    });
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Data wizyty</Text>
      <TextInput style={styles.input} defaultValue={appointment.date} editable={false} />

      <Text style={styles.label}>Godzina</Text>
      <TextInput style={styles.input} defaultValue={appointment.time} />

      <Text style={styles.label}>Pacjent</Text>
      <TextInput style={styles.input} defaultValue={appointment.patient} />

      <Text style={styles.label}>Powód wizyty</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        defaultValue={appointment.reason}
        multiline
      />

      {doctor && (
        <>
          <Text style={styles.label}>Lekarz</Text>
          <TextInput style={styles.input} defaultValue={`${doctor.person} – ${doctor.title}`} />
        </>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Zapisz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    gap: 16,
    minHeight: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 32,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
