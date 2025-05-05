import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetDoctors } from '@/hooks/doctor/useGetDoctors';

type Doctor = {
  id: number;
  person: string;
  title: string;
  days: string;
  time: string;
  icon: JSX.Element;
};

export default function DoctorsScreen() {
  const { doctors, loading } = useGetDoctors();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {doctors.map((doctor) => (
        <View key={doctor.id} style={styles.card}>
          <View style={styles.iconWrapper}>{specIcon[doctor.specialization.name as keyof typeof specIcon]}</View>
          <View style={styles.info}>
            <Text style={styles.person}>Dr. {doctor.name} {doctor.lastName}</Text>
            <Text style={styles.title}>{doctor.specialization.name}</Text>
            <Text style={styles.availability}>
              Kontakt: {doctor.email}
            </Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const specIcon = {
  'Kardiolog': <FontAwesome5 name="heartbeat" size={32} color="#fff" />,
  'Neurolog': <FontAwesome5 name="brain" size={32} color="#fff" />,
  'Ortopeda': <MaterialCommunityIcons name="bone" size={32} color="#fff" />,
  'Stomatolog': <FontAwesome5 name="tooth" size={32} color="#fff" />,
  'Diabetolog': <FontAwesome5 name="notes-medical" size={32} color="#fff" />,
  'Pediatra': <FontAwesome5 name="user-md" size={32} color="#fff" />,
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
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
    shadowOpacity: 0.35,
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
