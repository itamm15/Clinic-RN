import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

type Doctor = {
  id: number;
  person: string;
  title: string;
  days: string;
  time: string;
  icon: JSX.Element;
};

export default function DoctorsScreen() {
  const DOCTORS: Doctor[] = [
    {
      id: 1,
      person: 'Dr. Krzysztof Zjadek',
      title: 'Kardiolog',
      days: 'Poniedziałek - Piątek',
      time: '8:00 - 16:00',
      icon: <FontAwesome5 name="heartbeat" size={32} color="#fff" />,
    },
    {
      id: 2,
      person: 'Dr. Karina Wojska',
      title: 'Neurolog',
      days: 'Poniedziałek - Czwartek',
      time: '8:00 - 12:00',
      icon: <FontAwesome5 name="brain" size={32} color="#fff" />,
    },
    {
      id: 3,
      person: 'Dr. Karol Poss',
      title: 'Ortopeda',
      days: 'Wtorek - Piątek',
      time: '12:00 - 19:00',
      icon: <MaterialCommunityIcons name="bone" size={32} color="#fff" />,
    },
    {
      id: 4,
      person: 'Dr. Karol Wojteka',
      title: 'Stomatolog',
      days: 'Poniedziałek - Piątek',
      time: '9:30 - 15:00',
      icon: <FontAwesome5 name="tooth" size={32} color="#fff" />,
    },
    {
      id: 5,
      person: 'Dr. Magdalena Kowalska',
      title: 'Diabetolog',
      days: 'Środa - Piątek',
      time: '8:30 - 19:00',
      icon: <FontAwesome5 name="notes-medical" size={32} color="#fff" />,
    },
    {
      id: 6,
      person: 'Dr. Szymon Szczepała',
      title: 'Pediatra',
      days: 'Czwartek - Piątek',
      time: '8:00 - 19:00',
      icon: <FontAwesome5 name="user-md" size={32} color="#fff" />,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lekarze</Text>
      {DOCTORS.map((doctor) => (
        <View key={doctor.id} style={styles.card}>
          <View style={styles.iconWrapper}>{doctor.icon}</View>
          <View style={styles.info}>
            <Text style={styles.person}>{doctor.person}</Text>
            <Text style={styles.title}>{doctor.title}</Text>
            <Text style={styles.availability}>
              {doctor.days} | {doctor.time}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 100,
  },
  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  person: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  availability: {
    fontSize: 13,
    color: '#007AFF',
  },
});
