import { useGetSpecializations } from '@/hooks/specialization/useGetSpecializations';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';

const specIcon = {
  'Kardiolog': <FontAwesome5 name="heartbeat" size={32} color="#fff" />,
  'Neurolog': <FontAwesome5 name="brain" size={32} color="#fff" />,
  'Ortopeda': <MaterialCommunityIcons name="bone" size={32} color="#fff" />,
  'Stomatolog': <FontAwesome5 name="tooth" size={32} color="#fff" />,
  'Diabetolog': <FontAwesome5 name="notes-medical" size={32} color="#fff" />,
  'Pediatra': <FontAwesome5 name="user-md" size={32} color="#fff" />,
};

export default function SpecsScreen() {
  const { specializations, loading, refetch } = useGetSpecializations();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ title: 'Specjalizacje' });
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Czy na pewno chcesz usunąć tę specjalizację?');
    if (confirmed) {
      axios.delete(`http://localhost:5183/api/specialization/${id}`).then(() => {
        refetch();
      });
    }
    return;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie specjalizacji...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addSpec')}>
        <Text style={styles.addButtonText}>Dodaj specjalizacje</Text>
      </TouchableOpacity>

      {specializations.length > 0 ? (
        specializations.map((spec) => (
          <View key={spec.id} style={styles.card}>
            <View style={styles.iconWrapper}>
              {specIcon[spec.name as keyof typeof specIcon]}
            </View>
            <Text style={styles.name}>{spec.name}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(spec.id)}>
              <Feather name="trash-2" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>Brak dostępnych specjalizacji.</Text>
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
  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});
