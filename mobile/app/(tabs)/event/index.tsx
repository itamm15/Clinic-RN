import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGetVisit } from "@/hooks/visit/useGetVisit";

export default function EventScreen() {
  const { id, day } = useLocalSearchParams();
  const { visit, loading } = useGetVisit(parseInt(id as string));
  const time = new Date().toTimeString().slice(0, 5);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (!visit?.visitDate) return;

    const path = day ? `/events?date=${visit.visitDate}&day=${day}` : `/allEvents`;

    navigation.setOptions({
      title: `Informacje o wizycie nr. ${visit.id}`,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.push(path)} style={{ paddingLeft: 16 }}>
          <Text style={{ fontSize: 22, color: 'black', marginRight: 8 }}>←</Text>
        </TouchableOpacity>
      ),
    });
  }, [visit])

  if (!visit) return <Text>Wizyta nie znaleziona</Text>;
  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Data wizyty</Text>
      <TextInput style={styles.input} defaultValue={visit.visitDate.toString()} editable={false} />

      <Text style={styles.label}>Godzina</Text>
      <TextInput style={styles.input} defaultValue={time} />

      <Text style={styles.label}>Pacjent</Text>
      <TextInput style={styles.input} defaultValue={visit.patientFullName} />

      <Text style={styles.label}>Powód wizyty</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        defaultValue={visit.visitReason}
        multiline
      />

      <>
        <Text style={styles.label}>Lekarz</Text>
        <TextInput style={styles.input} defaultValue={`${visit.doctorFullName} – ${visit.doctorSpecialization}`} />
      </>

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
