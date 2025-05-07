import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetDocuments } from '@/hooks/document/useGetDocuments';

export default function DocumentsScreen() {
  const { documents, loading } = useGetDocuments();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie dokumentów...</Text>
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addDocument')}>
          <Text style={styles.addButtonText}>Dodaj dokument</Text>
        </TouchableOpacity>

        <Text style={styles.noDocuments}>Brak dostępnych dokumentów.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addDocument')}>
        <Text style={styles.addButtonText}>Dodaj dokument</Text>
      </TouchableOpacity>

      {documents.map((doc) => (
        <TouchableOpacity key={doc.id} onPress={() => router.push(`/editDocument?id=${doc.id}`)}>
          <View key={doc.id} style={styles.card}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="file-alt" size={24} color="#fff" />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{doc.title}</Text>
              <Text style={styles.meta}>{new Date(doc.createdAt).toLocaleDateString()}</Text>
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
    fontSize: 13,
    color: '#666',
  },
  noDocuments: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    textAlign: 'center',
  },
});
