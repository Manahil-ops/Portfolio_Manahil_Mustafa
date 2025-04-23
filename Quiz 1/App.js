import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Keyboard, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherData = {
  location: 'Islamabad',
  temperature: '25°C',
  condition: 'Sunny', // Change this to 'Rainy', 'Cloudy', or 'Thunderstorm' to see different icons
  hourlyTemperatures: [
    { time: '6 AM', temp: '22°C' },
    { time: '12 PM', temp: '28°C' },
    { time: '6 PM', temp: '26°C' },
    { time: '12 AM', temp: '20°C' },
  ],
};

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <MaterialCommunityIcons name="weather-sunny" size={100} color="orange" />;
    case 'rainy':
      return <MaterialCommunityIcons name="weather-rainy" size={100} color="blue" />;
    case 'cloudy':
      return <MaterialCommunityIcons name="weather-cloudy" size={100} color="gray" />;
    case 'thunderstorm':
      return <MaterialCommunityIcons name="weather-lightning-rainy" size={100} color="yellow" />;
    default:
      return <MaterialCommunityIcons name="weather-sunny" size={100} color="orange" />;
  }
};

const getWeatherText = (condition) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return 'It\'s a bright and sunny day! Perfect for outdoor activities.';
    case 'rainy':
      return 'Don\'t forget your umbrella! It\'s raining outside.';
    case 'cloudy':
      return 'The sky is covered with clouds. A cozy day to stay indoors.';
    case 'thunderstorm':
      return 'Stay safe! There\'s a thunderstorm outside.';
    default:
      return 'Enjoy the weather!';
  }
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(weatherData.location);
  const [temperature, setTemperature] = useState(weatherData.temperature);
  const [condition, setCondition] = useState(weatherData.condition);
  const [hourlyTemperatures, setHourlyTemperatures] = useState(weatherData.hourlyTemperatures);

  const handleSearch = () => {
    // Simulate fetching weather data based on the search query
    if (searchQuery.trim()) {
      setLocation(searchQuery);
      setTemperature('22°C'); // Simulated temperature
      setCondition('Sunny'); // Simulated condition
      setHourlyTemperatures([
        { time: '6 AM', temp: '20°C' },
        { time: '12 PM', temp: '26°C' },
        { time: '6 PM', temp: '24°C' },
        { time: '12 AM', temp: '18°C' },
      ]);
      Keyboard.dismiss(); // Hide the keyboard after search
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a location..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.temperature}>{temperature}</Text>
        </View>
        <View style={styles.weatherContainer}>
          {getWeatherIcon(condition)}
          <Text style={styles.weatherCondition}>{condition}</Text>
          <Text style={styles.weatherText}>{getWeatherText(condition)}</Text>
        </View>
        <View style={styles.hourlyContainer}>
          <Text style={styles.hourlyTitle}>Hourly Temperatures</Text>
          <View style={styles.hourlyTemperatures}>
            {hourlyTemperatures.map((hour, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                <Text style={styles.hourlyTemp}>{hour.temp}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Light blue background
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchContainer: {
    width: '90%',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  temperature: {
    fontSize: 30,
    color: 'white',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherCondition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  weatherText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  hourlyContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
  },
  hourlyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  hourlyTemperatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hourlyItem: {
    alignItems: 'center',
  },
  hourlyTime: {
    fontSize: 16,
    color: 'white',
  },
  hourlyTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});