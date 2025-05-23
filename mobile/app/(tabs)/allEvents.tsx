import { useGetVisits } from "@/hooks/visit/useGetVisits";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AllEventsScreen() {
  const { visits, loading } = useGetVisits();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane...</Text>
      </View>
    );
  }

  if (visits.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addVisit')}>
          <Text style={styles.addButtonText}>Dodaj wizyte</Text>
        </TouchableOpacity>

        <Text style={styles.noVisits}>Brak dostępnych wizyt.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addVisit')}>
        <Text style={styles.addButtonText}>Dodaj wizyte</Text>
      </TouchableOpacity>

      {visits.map((appointment) => {
        return (
          <TouchableOpacity onPress={() => router.push(`/event?id=${appointment.id}`)}>
          <View key={appointment.id} style={styles.card}>
            <Text style={styles.time}>{appointment.visitDate.toString()}</Text>
            <Text style={styles.patient}>{appointment.patientFullName}</Text>
            <Text style={styles.reason}>{appointment.visitReason}</Text>
            {<Text style={styles.doctor}>{appointment.doctorFullName} – {appointment.doctorSpecialization}</Text>}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  container: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  patient: {
    fontSize: 15,
    color: '#111',
    marginBottom: 2,
  },
  reason: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  doctor: {
    fontSize: 13,
    color: '#007AFF',
  },
  noVisits: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 48,
  }
});
