import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { APPOINTMENTS } from '@/constants/Appointments';

export default function PatientsScreen() {
  const patients = Array.from(
    new Map(
      APPOINTMENTS.map((a) => [a.patient, { name: a.patient, lastVisit: a.date }])
    ).values()
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patients.map((patient, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="user" size={24} color="#fff" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.reason}>Ostatnia wizyta: {patient.lastVisit}</Text>
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
