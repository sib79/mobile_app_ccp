import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Chip, Searchbar } from "react-native-paper";

const mockEvents = [
  {
    id: "1",
    name: "Tech Workshop",
    time: "2025-06-25 10:00",
    venue: "FEST Hall",
    category: "Tech",
    description: "Learn React Native",
  },
  {
    id: "2",
    name: "Football Match",
    time: "2025-06-26 15:00",
    venue: "Sports Ground",
    category: "Sports",
    description: "Inter-department match",
  },
  {
    id: "3",
    name: "AI Seminar",
    time: "2025-06-27 14:00",
    venue: "Auditorium",
    category: "Tech",
    description: "AI advancements",
  },
  {
    id: "4",
    name: "Music Night",
    time: "2025-06-28 18:00",
    venue: "Open Air Theater",
    category: "Entertainment",
    description: "Live band performances",
  },
  {
    id: "5",
    name: "Entrepreneurship Talk",
    time: "2025-06-29 11:00",
    venue: "Lecture Room A",
    category: "Business",
    description: "Startup success stories",
  },
  {
    id: "6",
    name: "Coding Hackathon",
    time: "2025-06-30 09:00",
    venue: "Computer Lab",
    category: "Tech",
    description: "24-hour coding challenge",
  },
  {
    id: "7",
    name: "Drama Night",
    time: "2025-07-01 19:00",
    venue: "Main Auditorium",
    category: "Entertainment",
    description: "Student-performed plays",
  },
  {
    id: "8",
    name: "Blood Donation Camp",
    time: "2025-07-02 10:00",
    venue: "Health Center",
    category: "Social",
    description: "Donate blood, save lives",
  },
  {
    id: "9",
    name: "Science Exhibition",
    time: "2025-07-03 13:00",
    venue: "Exhibition Hall",
    category: "Academic",
    description: "Innovative student projects",
  },
  {
    id: "10",
    name: "Photography Contest",
    time: "2025-07-04 12:00",
    venue: "Gallery Room",
    category: "Arts",
    description: "Showcase your photography skills",
  },
  {
    id: "11",
    name: "Quiz Competition",
    time: "2025-07-05 14:00",
    venue: "Lecture Room B",
    category: "Academic",
    description: "General knowledge battle",
  },
  {
    id: "12",
    name: "Yoga Session",
    time: "2025-07-06 07:00",
    venue: "Campus Lawn",
    category: "Health",
    description: "Start your day fresh",
  },
  {
    id: "13",
    name: "Gaming Tournament",
    time: "2025-07-07 16:00",
    venue: "E-Gaming Zone",
    category: "Entertainment",
    description: "Compete in your favorite games",
  },
];

export default function ExploreScreen() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [userPreferences, setUserPreferences] = useState(["Tech"]);
  const router = useRouter();

  useEffect(() => {
    setEvents(mockEvents);
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const prefs = await AsyncStorage.getItem("userPreferences");
      if (prefs) setUserPreferences(JSON.parse(prefs));
    } catch (e) {
      console.error(e);
    }
  };

  const recommendedEvents = events.filter((event) =>
    userPreferences.includes(event.category)
  );

  const filteredEvents = events
    .filter(
      (event) =>
        (filterCategory === "All" || event.category === filterCategory) &&
        (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.time) - new Date(a.time);
      return 0;
    });

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search events..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: "#000" }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {[
          "All",
          "Tech",
          "Sports",
          "Entertainment",
          "Social",
          "Business",
          "Academic",
          "Health",
          "Arts",
        ].map((category) => (
          <Chip
            key={category}
            selected={filterCategory === category}
            onPress={() => setFilterCategory(category)}
            style={[
              styles.chip,
              {
                backgroundColor:
                  filterCategory === category ? "#007AFF" : "#E0E0E0",
              },
            ]}
            textStyle={{ color: filterCategory === category ? "#FFF" : "#000" }}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <Button
        onPress={() => setSortBy(sortBy === "Newest" ? "Popular" : "Newest")}
        textColor="#007AFF"
      >
        Sort by: {sortBy}
      </Button>

      <Text style={styles.header}>Recommended Events</Text>
      <FlatList
        data={recommendedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} router={router} />}
      />
      <Text style={styles.header}>All Events</Text>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} router={router} />}
      />
    </ScrollView>
  );
}

// EventCard Component
function EventCard({ event, router }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{event.name}</Text>
      <Text style={styles.cardSub}>
        {event.time} | {event.venue}
      </Text>
      <Button
        onPress={() =>
          router.push({
            pathname: "/eventDetails",
            params: { event: JSON.stringify(event) },
          })
        }
        mode="contained"
        buttonColor="#007AFF"
        textColor="#FFF"
        style={{ marginTop: 8 }}
      >
        View Details
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFFFFF" },
  searchbar: { marginVertical: 10, backgroundColor: "#F0F0F0" },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chip: { margin: 4 },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#000",
  },
  card: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardSub: {
    color: "#555",
    marginTop: 4,
  },
});
