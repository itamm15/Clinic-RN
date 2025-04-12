import { APPOINTMENTS } from "@/constants/Appointments";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const DOCTORS = [
  { id: 1, person: 'Dr. Krzysztof Zjadek', title: 'Kardiolog' },
  { id: 2, person: 'Dr. Karina Wojska', title: 'Neurolog' },
  { id: 3, person: 'Dr. Karol Poss', title: 'Ortopeda' },
  { id: 4, person: 'Dr. Karol Wojteka', title: 'Stomatolog' },
  { id: 5, person: 'Dr. Magdalena Kowalska', title: 'Diabetolog' },
  { id: 6, person: 'Dr. Szymon Szczepała', title: 'Pediatra' },
];

export default function AllEventsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {APPOINTMENTS.map((appointment) => {
        const doctor = DOCTORS.find((doc) => doc.id === appointment.doctorId);

        return (
          <View key={appointment.id} style={styles.card}>
            <Text style={styles.time}>{appointment.time}</Text>
            <Text style={styles.patient}>{appointment.patient}</Text>
            <Text style={styles.reason}>{appointment.reason}</Text>
            {doctor && <Text style={styles.doctor}>{doctor.person} – {doctor.title}</Text>}
          </View>
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
