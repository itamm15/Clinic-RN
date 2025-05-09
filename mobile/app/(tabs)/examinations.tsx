import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetExaminations } from '@/hooks/examination/useGetExaminations';

export default function ExaminationsScreen() {
  const { examinations, loading } = useGetExaminations();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie badań...</Text>
      </View>
    );
  }

  if (examinations.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addExamination')}>
          <Text style={styles.addButtonText}>Dodaj badanie</Text>
        </TouchableOpacity>
        <Text style={styles.noData}>Brak dostępnych badań.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addExamination')}>
        <Text style={styles.addButtonText}>Dodaj badanie</Text>
      </TouchableOpacity>

      {examinations.map((exam) => (
        <View key={exam.id} style={styles.card}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="notes-medical" size={24} color="#fff" />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{exam.name}</Text>
            <Text style={styles.meta}>Lekarz: {exam.doctor.name} {exam.doctor.lastName}</Text>
            <Text style={styles.meta}>Opis: {exam.description}</Text>
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
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  noData: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 48,
  }
});
