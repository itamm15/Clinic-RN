import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useGetPatients } from '@/hooks/patient/useGetPatients';

export default function PatientsScreen() {
  const { patients, loading } = useGetPatients();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patients.map((patient, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="user" size={24} color="#fff" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{patient.firstName} {patient.lastName}</Text>
            <Text style={styles.reason}>Kontakt: {patient.phoneNumber}</Text>
            <Text style={styles.reason}>Email: {patient.email}</Text>
          </View>
        </View>
      ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reason: {
    fontSize: 13,
    color: '#666',
    marginVertical: 2,
  },
});
