import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function EventsScreen() {
  const { date, day } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `${day}, ${date}`,
    });
  })

  return (
    <View>
      hello
    </View>
  )
};
