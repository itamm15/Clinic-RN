import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGetPayments } from '@/hooks/payment/useGetPayments';

export default function PaymentsScreen() {
  const { payments, loading } = useGetPayments();
  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Pobieram dane płatności...</Text>
      </View>
    );
  }

  if (payments.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addPayment')}>
          <Text style={styles.addButtonText}>Dodaj płatność</Text>
        </TouchableOpacity>

        <Text style={styles.noPayments}>Brak dostępnych płatności.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/addPayment')}>
        <Text style={styles.addButtonText}>Dodaj płatność</Text>
      </TouchableOpacity>

      {payments.map((payment, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="money-bill-wave" size={24} color="#fff" />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{payment.patient.firstName} {payment.patient.lastName}</Text>
            <Text style={styles.amount}>Kwota: {payment.amount.toFixed(2)} zł</Text>
            <Text style={styles.description}>{payment.description}</Text>
            <Text style={styles.date}>Data: {payment.paymentDate.toString()}</Text>
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
  amount: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 13,
    color: '#007AFF',
    marginTop: 4,
  },
  noPayments: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginTop: 48,
  }
});
