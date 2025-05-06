import { useGetSpecializations } from '@/hooks/specialization/useGetSpecializations';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const specIcon = {
  'Kardiolog': <FontAwesome5 name="heartbeat" size={32} color="#fff" />,
  'Neurolog': <FontAwesome5 name="brain" size={32} color="#fff" />,
  'Ortopeda': <MaterialCommunityIcons name="bone" size={32} color="#fff" />,
  'Stomatolog': <FontAwesome5 name="tooth" size={32} color="#fff" />,
  'Diabetolog': <FontAwesome5 name="notes-medical" size={32} color="#fff" />,
  'Pediatra': <FontAwesome5 name="user-md" size={32} color="#fff" />,
};

export default function SpecsScreen() {
  const { specializations, loading } = useGetSpecializations();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Specjalizacje',
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie specjalizacji...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {specializations.length > 0 ? (
        specializations.map((spec) => (
          <View key={spec.id} style={styles.card}>
            <View style={styles.iconWrapper}>
              {specIcon[spec.name as keyof typeof specIcon]}
            </View>
            <Text style={styles.name}>{spec.name}</Text>
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
  },
  noData: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});
