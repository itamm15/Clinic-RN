import { APPOINTMENTS } from '@/constants/Appointments';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DOCTORS = [
  { id: 1, person: 'Dr. Krzysztof Zjadek', title: 'Kardiolog' },
  { id: 2, person: 'Dr. Karina Wojska', title: 'Neurolog' },
  { id: 3, person: 'Dr. Karol Poss', title: 'Ortopeda' },
  { id: 4, person: 'Dr. Karol Wojteka', title: 'Stomatolog' },
  { id: 5, person: 'Dr. Magdalena Kowalska', title: 'Diabetolog' },
  { id: 6, person: 'Dr. Szymon Szczepała', title: 'Pediatra' },
];

export default function EventsScreen() {
  const { date, day } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `${day}, ${date}`,
    });
  }, [day, date]);

  const appointmentsPerDay = APPOINTMENTS.filter((appointment) => appointment.date === date);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {appointmentsPerDay.length > 0 ? (
        appointmentsPerDay.map((appointment) => {
          const doctor = DOCTORS.find((doc) => doc.id === appointment.doctorId);

          return (
            <TouchableOpacity onPress={() => router.push(`/events/event?id=${appointment.id}`)}>
              <View key={appointment.id} style={styles.card}>
                <Text style={styles.time}>{appointment.time}</Text>
                <Text style={styles.patient}>{appointment.patient}</Text>
                <Text style={styles.reason}>{appointment.reason}</Text>
                {doctor && <Text style={styles.doctor}>{doctor.person} – {doctor.title}</Text>}
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noAppointments}>Brak wizyt w tym dniu.</Text>
      )}
    </ScrollView>
  );
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
  noAppointments: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});
