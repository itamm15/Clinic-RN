import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const LINKS = [
  { label: 'Zobacz recepty', href: '/prescriptions' },
  { label: 'Zobacz płatności', href: '/payments' },
  { label: 'Zobacz dokumenty', href: '/documents' },
]

export default function OtherScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {LINKS.map((link, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => router.push(link.href)}>
          <Text style={styles.buttonText}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    marginTop: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
