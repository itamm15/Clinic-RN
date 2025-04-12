import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

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
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `${day}, ${date}`,
    });
  }, [day, date]);

  const appointmentsPerDay = appointments.filter((appointment) => appointment.date === date);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {appointmentsPerDay.length > 0 ? (
        appointmentsPerDay.map((appointment) => {
          const doctor = DOCTORS.find((doc) => doc.id === appointment.doctorId);

          return (
            <View key={appointment.id} style={styles.card}>
              <Text style={styles.time}>{appointment.time}</Text>
              <Text style={styles.patient}>{appointment.patient}</Text>
              <Text style={styles.reason}>{appointment.reason}</Text>
              {doctor && <Text style={styles.doctor}>{doctor.person} – {doctor.title}</Text>}
            </View>
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

const appointments = [
  {
    id: 1,
    doctorId: 1,
    date: '2025-04-14',
    time: '08:30',
    patient: 'Jan Nowak',
    reason: 'Ból w klatce piersiowej',
  },
  {
    id: 2,
    doctorId: 2,
    date: '2025-04-14',
    time: '10:00',
    patient: 'Anna Zielińska',
    reason: 'Bóle głowy',
  },
  {
    id: 3,
    doctorId: 1,
    date: '2025-04-14',
    time: '11:30',
    patient: 'Kacper Malinowski',
    reason: 'Kontrola kardiologiczna',
  },
  {
    id: 4,
    doctorId: 3,
    date: '2025-04-15',
    time: '09:00',
    patient: 'Karolina Kwiatkowska',
    reason: 'Ból kolana',
  },
  {
    id: 5,
    doctorId: 4,
    date: '2025-04-15',
    time: '13:00',
    patient: 'Mateusz Cichoń',
    reason: 'Przegląd dentystyczny',
  },
  {
    id: 6,
    doctorId: 5,
    date: '2025-04-16',
    time: '08:30',
    patient: 'Magdalena Mazur',
    reason: 'Konsultacja diabetologiczna',
  },
  {
    id: 7,
    doctorId: 1,
    date: '2025-04-16',
    time: '10:00',
    patient: 'Paweł Walczak',
    reason: 'Echo serca',
  },
  {
    id: 8,
    doctorId: 3,
    date: '2025-04-16',
    time: '12:30',
    patient: 'Iga Sobczak',
    reason: 'Zwichnięcie stawu',
  },
  {
    id: 9,
    doctorId: 2,
    date: '2025-04-16',
    time: '15:00',
    patient: 'Dominika Sadowska',
    reason: 'Zawroty głowy',
  },
  {
    id: 10,
    doctorId: 6,
    date: '2025-04-17',
    time: '09:00',
    patient: 'Tomasz Jabłoński',
    reason: 'Wysoka gorączka u dziecka',
  },
  {
    id: 11,
    doctorId: 4,
    date: '2025-04-17',
    time: '13:30',
    patient: 'Julia Piotrowska',
    reason: 'Leczenie kanałowe',
  },
  {
    id: 12,
    doctorId: 5,
    date: '2025-04-18',
    time: '08:30',
    patient: 'Michał Zawadzki',
    reason: 'Insulina – korekta dawki',
  },
  {
    id: 13,
    doctorId: 3,
    date: '2025-04-18',
    time: '10:00',
    patient: 'Łukasz Król',
    reason: 'Rehabilitacja po urazie',
  },
  {
    id: 14,
    doctorId: 6,
    date: '2025-04-18',
    time: '12:00',
    patient: 'Ola Krajewska',
    reason: 'Bilans dwulatka',
  },
  {
    id: 15,
    doctorId: 2,
    date: '2025-04-18',
    time: '14:00',
    patient: 'Tadeusz Duda',
    reason: 'Problemy z pamięcią',
  },
  {
    id: 16,
    doctorId: 1,
    date: '2025-04-18',
    time: '15:30',
    patient: 'Edyta Ławniczak',
    reason: 'EKG i konsultacja',
  },
  {
    id: 17,
    doctorId: 4,
    date: '2025-04-19',
    time: '09:00',
    patient: 'Wojciech Górka',
    reason: 'Wyrwanie ósemki',
  },
  {
    id: 18,
    doctorId: 6,
    date: '2025-04-19',
    time: '11:30',
    patient: 'Zofia Zielonka',
    reason: 'Szczepienie dziecka',
  },
  {
    id: 19,
    doctorId: 1,
    date: '2025-04-19',
    time: '13:30',
    patient: 'Maciej Orlik',
    reason: 'Kontrola serca',
  },
];
