import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-elements";
import { Button, TextInput } from "react-native-paper";

export default function FeedbackScreen() {
  const { eventId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const submitFeedback = async () => {
    try {
      const feedbacks = await AsyncStorage.getItem("feedbacks");
      const feedbackList = feedbacks ? JSON.parse(feedbacks) : [];
      feedbackList.push({
        eventId,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      });
      await AsyncStorage.setItem("feedbacks", JSON.stringify(feedbackList));
      router.back();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback for Event #{eventId}</Text>

      <Rating
        showRating
        onFinishRating={setRating}
        style={{ paddingVertical: 20 }}
      />

      <TextInput
        label="Enter your comment"
        value={comment}
        onChangeText={setComment}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <Button mode="contained" onPress={submitFeedback} style={styles.button}>
        Submit Feedback
      </Button>

      <Button onPress={() => router.back()} style={styles.button}>
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});
