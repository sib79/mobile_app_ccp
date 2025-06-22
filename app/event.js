import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { Button, Menu, useTheme } from "react-native-paper";

const STORAGE_KEY = "customEvents";

const categories = [
  "Tech",
  "Sports",
  "Entertainment",
  "Academic",
  "Health",
  "Social",
  "Business",
];

export default function Event() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    venue: "",
    category: "",
    dateTime: "",
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const theme = useTheme();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const onChangeDate = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    handleChange(
      "dateTime",
      currentDate.toISOString().slice(0, 16).replace("T", " ")
    );
  };

  const saveEvent = async () => {
    const { name, description, venue, category, dateTime } = form;

    if (!name || !description || !venue || !category || !dateTime) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const eventList = stored ? JSON.parse(stored) : [];

      const newEvent = {
        id: Date.now().toString(),
        name,
        description,
        venue,
        category,
        time: dateTime,
      };

      eventList.push(newEvent);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));

      Alert.alert("✅ Success", "Event saved successfully!");
      setForm({
        name: "",
        description: "",
        venue: "",
        category: "",
        dateTime: "",
      });
    } catch (e) {
      console.error("Error saving event:", e);
      Alert.alert("Error", "Could not save the event.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: "#ffffff" }]}
    >
      <Text style={styles.label}>Event Name</Text>
      <TextInput
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Enter event name"
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Enter description"
        style={styles.input}
        multiline
      />

      <Text style={styles.label}>Venue</Text>
      <TextInput
        value={form.venue}
        onChangeText={(text) => handleChange("venue", text)}
        placeholder="Enter venue"
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.dropdown}
          >
            {form.category || "Select Category"}
          </Button>
        }
      >
        {categories.map((cat) => (
          <Menu.Item
            key={cat}
            onPress={() => {
              handleChange("category", cat);
              setMenuVisible(false);
            }}
            title={cat}
          />
        ))}
      </Menu>

      <Text style={styles.label}>Date & Time</Text>
      <Button
        mode="outlined"
        onPress={() => setShowPicker(true)}
        style={styles.dropdown}
      >
        {form.dateTime || "Select Date & Time"}
      </Button>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button
        mode="contained"
        onPress={saveEvent}
        style={{ marginTop: 30 }}
        buttonColor="#007AFF"
        textColor="#fff"
      >
        Save Event
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 26,
    paddingTop: 50,
    paddingBottom: 100,
    height: "100%",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  dropdown: {
    marginTop: 5,
    justifyContent: "center",
  },
});
