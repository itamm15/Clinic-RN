import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';

export default function HomeScreen() {
  const events = [
    { date: '2025-04-14', day: 'Poniedziałek', numberOfEvents: 3 },
    { date: '2025-04-15', day: 'Wtorek', numberOfEvents: 2 },
    { date: '2025-04-16', day: 'Środa', numberOfEvents: 4 },
    { date: '2025-04-17', day: 'Czwartek', numberOfEvents: 2 },
    { date: '2025-04-18', day: 'Piątek', numberOfEvents: 5 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Wydarzenia</Text>

      {events.map((event, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.day}>{event.day}</Text>
          <Text style={styles.count}>{event.numberOfEvents} wizyty</Text>
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
    minHeight: '100%'
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
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  day: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  count: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
});
