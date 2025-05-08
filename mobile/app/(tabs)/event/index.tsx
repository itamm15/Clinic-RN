import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useGetVisit } from "@/hooks/visit/useGetVisit";
import { useGetPatients } from "@/hooks/patient/useGetPatients";
import { useGetDoctors } from "@/hooks/doctor/useGetDoctors";

export default function EventScreen() {
  const { id, day } = useLocalSearchParams();
  const { visit, loading } = useGetVisit(parseInt(id as string));
  const router = useRouter();
  const navigation = useNavigation();

  const [visitReason, setVisitReason] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [patientItems, setPatientItems] = useState<{ label: string; value: number }[]>([]);
  const [doctorItems, setDoctorItems] = useState<{ label: string; value: number }[]>([]);
  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);

  const { patients } = useGetPatients();
  const { doctors } = useGetDoctors();

  useEffect(() => {
    setPatientItems(patients.map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p.id })));
    setDoctorItems(doctors.map(d => ({ label: `Dr. ${d.name} ${d.lastName}`, value: d.id })));
  }, [patients, doctors]);

  useEffect(() => {
    if (!visit) return;

    setVisitReason(visit.visitReason);

    const path = day ? `/events?date=${visit.visitDate}&day=${day}` : `/allEvents`;

    navigation.setOptions({
      title: `Informacje o wizycie nr. ${visit.id}`,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push(path)} style={{ paddingLeft: 16 }}>
          <Text style={{ fontSize: 22, color: 'black', marginRight: 8 }}>←</Text>
        </TouchableOpacity>
      ),
    });
  }, [visit]);

  const handleUpdate = async () => {
    if (!visit) return;

    try {
      await axios.put(`http://localhost:5183/api/visit/${visit.id}`, {
        visitDate: visit.visitDate,
        visitReason,
        patientId: selectedPatientId,
        doctorId: selectedDoctorId,
      });

      console.log("Zaktualizowano wizytę");

      const path = day ? `/events?date=${visit.visitDate}&day=${day}` : `/allEvents`;
      router.replace(path);
    } catch (error) {
      console.error("Błąd przy aktualizacji:", error);
    }
  };

  const handleDelete = async () => {
    if (!visit) return;
    const confirmed = confirm("Czy na pewno chcesz usunąć tę wizytę?");
    if (!confirmed) return;

    try {
      const path = day ? `/events?date=${visit.visitDate}&day=${day}` : `/allEvents`;
      await axios.delete(`http://localhost:5183/api/visit/${visit.id}`);
      router.replace(path);
    } catch (error) {
      console.error("Błąd przy usuwaniu wizyty:", error);
    }
  };

  if (!visit) return <Text>Wizyta nie znaleziona</Text>;
  if (loading) return <Text>Ładowanie...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Data wizyty</Text>
      <TextInput style={styles.input} value={visit.visitDate.toString()} editable={false} />

      <Text style={styles.label}>Powód wizyty</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={visitReason}
        onChangeText={setVisitReason}
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

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Zapisz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#f8f9fa', gap: 16, minHeight: '100%' },
  label: { fontWeight: 'bold', fontSize: 15, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  multiline: { height: 80, textAlignVertical: 'top' },
  dropdown: { marginBottom: 12, borderColor: '#ccc' },
  buttonGroup: { flexDirection: 'column', gap: 12, marginTop: 32 },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
