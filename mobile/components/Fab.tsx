import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Fab() {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity style={styles.fab} onPress={() => {/* TODO: handle create */}}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    maxHeight: '100%'
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
