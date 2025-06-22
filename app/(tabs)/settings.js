import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function SettingsScreen() {
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    await AsyncStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Button mode="contained" onPress={toggleTheme} style={styles.button}>
        Toggle Theme
      </Button>
      <Button onPress={() => router.back()} style={styles.button}>
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#000000", fontSize: 16, marginBottom: 20 },
  button: { marginTop: 10, width: 200 },
});
