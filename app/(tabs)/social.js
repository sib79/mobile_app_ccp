import { StyleSheet, Text, View } from "react-native";

export default function SocialScreen() {
  return (
    <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
      <Text style={styles.text}>Social Feed (Under Development)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
});
