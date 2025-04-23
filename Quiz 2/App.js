import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const API_URL = "https://api.disneyapi.dev/character"; 

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log("Fetching data...");
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setMovies(data.data.slice(0, 10)); // Load initial 10 movies
      } else {
        console.warn("Unexpected API response structure:", data);
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMovies = async () => {
    if (isFetchingMore) return; // Prevent duplicate calls

    try {
      setIsFetchingMore(true);
      console.log(Fetching more data for page ${page + 1}...);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const newMovies = data.data.slice(page * 10, (page + 1) * 10); // Get next 10 movies
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage(page + 1);
      } else {
        console.warn("Unexpected API response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {movies.length === 0 ? (
        <Text style={styles.noData}>No data available!</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              ) : (
                <Text>No Image Available</Text>
              )}
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>Appeared in: {item.films?.join(", ") || "Unknown"}</Text>
              <Text style={styles.rating}>TV Shows: {item.tvShows?.join(", ") || "N/A"}</Text>
            </View>
          )}
          onEndReached={fetchMoreMovies} // Load more when reaching bottom
          onEndReachedThreshold={0.5} // Adjust sensitivity
          ListFooterComponent={
            isFetchingMore ? <ActivityIndicator size="small" color="blue" /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f0f0" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  noData: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 10, borderRadius: 10, elevation: 3 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 16, color: "#555", marginTop: 5 },
  rating: { fontSize: 14, color: "#888", marginTop: 5 },
});

export default App;