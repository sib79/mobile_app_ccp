import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 60,
      }}
    >
      <Text style={{ color: "#000000", fontSize: 26, marginBottom: 20 }}>
        Welcome to CampusConnect+
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        <Button
          title="Create an Event"
          onPress={() => router.push("/event")}
          color="#007AFF"
        />
        <Button
          title="Go to Explore"
          onPress={() => router.push("/explore")}
          color="#007AFF"
        />
      </View>
    </View>
  );
}

IndexScreen.options = {
  headerShown: false,
};
