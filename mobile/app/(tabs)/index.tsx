import { useRouter } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const events = [
    { date: '2025-04-14', day: 'Poniedziałek', numberOfEvents: 3 },
    { date: '2025-04-15', day: 'Wtorek', numberOfEvents: 2 },
    { date: '2025-04-16', day: 'Środa', numberOfEvents: 4 },
    { date: '2025-04-17', day: 'Czwartek', numberOfEvents: 2 },
    { date: '2025-04-18', day: 'Piątek', numberOfEvents: 5 },
    { date: '2025-04-19', day: 'Sobota', numberOfEvents: 3 },
    { date: '2025-04-20', day: 'Niedziela', numberOfEvents: 0 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Wydarzenia</Text>

      {events.map((event, index) => (
        <TouchableOpacity onPress={() => router.push(`/events?date=${event.date}&day=${event.day}`)}>
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{event.day[0]}</Text>
                </View>
                <View style={styles.textContent}>
                  <Text style={styles.day}>{event.day}</Text>

                  <Text style={styles.count}>{numberOfVisits(event.numberOfEvents)}</Text>
                </View>
              </View>
              <Text style={styles.date}>{event.date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  function numberOfVisits(numberOfEvents: number) {
   return numberOfEvents === 0 ? "Brak wizyt" : numberOfEvents + " wizyty";
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#f8f9fa',
    minHeight: '100%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    cursor: 'pointer',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textContent: {
    justifyContent: 'center',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
});
