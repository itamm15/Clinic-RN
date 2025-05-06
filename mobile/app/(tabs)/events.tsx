import { useGetVisitsDailySummary } from '@/hooks/visit/useGetVisitsDailySummary';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  const { date, day } = useLocalSearchParams();
  const formattedDate = new Date(date as string).toISOString().slice(0, 10);
  const { visitsDailySummary, loading } = useGetVisitsDailySummary(formattedDate);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `${day}, ${date}`,
    });
  }, [day, date]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {visitsDailySummary.length > 0 ? (
        visitsDailySummary.map((appointment) => {
          return (
            <TouchableOpacity onPress={() => router.push(`/event?id=${appointment.id}&day=${day}`)}>
              <View key={appointment.id} style={styles.card}>
                <Text style={styles.time}>{appointment.visitDate.toString()}</Text>
                <Text style={styles.patient}>{appointment.patientFullName}</Text>
                <Text style={styles.reason}>{appointment.visitReason}</Text>
                <Text style={styles.doctor}>{appointment.doctorFullName} – {appointment.doctorSpecialization}</Text>
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
    shadowOpacity: 0.35,
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
