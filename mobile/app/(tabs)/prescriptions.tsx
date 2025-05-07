import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetPrescriptions } from '@/hooks/prescription/useGetPrescriptions';

export default function PrescriptionsScreen() {
  const { prescriptions, loading } = useGetPrescriptions();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane...</Text>
      </View>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addPrescription')}>
          <Text style={styles.addButtonText}>Dodaj receptę</Text>
        </TouchableOpacity>

        <Text style={styles.noVisits}>Brak dostępnych recept.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addPrescription')}>
        <Text style={styles.addButtonText}>Dodaj receptę</Text>
      </TouchableOpacity>

      {prescriptions.map((prescription) => (
        <TouchableOpacity key={prescription.id} onPress={() => router.push(`/editPrescription?id=${prescription.id}`)}>
          <View key={prescription.id} style={styles.card}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="file-prescription" size={24} color="#fff" />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{prescription.description}</Text>
              <Text style={styles.reason}>Wystawiono: {new Date(prescription.issuedAt).toLocaleDateString()}</Text>
              <Text style={styles.reason}>Pacjent: {prescription.patient.firstName} {prescription.patient.lastName}</Text>
              <Text style={styles.reason}>Lekarz: {prescription.doctor.name} {prescription.doctor.lastName}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  noVisits: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 48,
  }
});
