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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
});
