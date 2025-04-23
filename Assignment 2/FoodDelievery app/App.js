import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // Mock API for restaurant data

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        cuisine: meal.strCategory,
        rating: (Math.random() * (5 - 3) + 3).toFixed(1),
        image: meal.strMealThumb,
      }));
      setRestaurants(formattedData);
      setFilteredRestaurants(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === '') {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(restaurants.filter(restaurant => restaurant.cuisine === cuisine));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Food Delivery App</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search Restaurants..."
        value={search}
        onChangeText={setSearch}
      />
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('Seafood')}>
          <Text>Seafood</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('Vegetarian')}>
          <Text>Vegetarian</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cuisine}>{item.cuisine}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  searchBar: { borderWidth: 1, padding: 8, borderRadius: 5, marginBottom: 10 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  filterButton: { padding: 8, backgroundColor: '#ddd', borderRadius: 5 },
  card: { flexDirection: 'row', padding: 10, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 8 },
  image: { width: 80, height: 80, borderRadius: 8 },
  details: { marginLeft: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  cuisine: { fontSize: 14, color: '#666' },
  rating: { fontSize: 14, fontWeight: 'bold' },
});

export default App;
