import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock job data (for Expo Snack, since we can't run a backend)
const mockJobs = [
  { _id: '1', title: 'Software Engineer', company: 'Tech Corp', description: 'Develop web applications.' },
  { _id: '2', title: 'Product Manager', company: 'Innovate Inc', description: 'Lead product development.' },
  { _id: '3', title: 'UI/UX Designer', company: 'Design Studio', description: 'Create user-friendly designs.' },
];

// Mock user data (simulating Google login for Expo Snack)
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://via.placeholder.com/150', // Placeholder image URL
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Store user data (name, email, profile picture)

  // Load jobs from AsyncStorage when the app starts
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const storedJobs = await AsyncStorage.getItem('jobs');
        if (storedJobs) {
          setJobs(JSON.parse(storedJobs));
        }
      } catch (e) {
        console.error('Failed to load jobs from AsyncStorage:', e);
      }
    };
    loadJobs();
  }, []);

  // Mock Google login function (for Expo Snack)
  const googleLogin = async () => {
    try {
      // In a real app, you'd use @react-native-google-signin/google-signin
      // Here, we mock the login and user data
      const userData = mockUser;
      setUser(userData);
      setIsLoggedIn(true);

      // Mock fetching jobs (in a real app, fetch from backend)
      const jobsData = mockJobs;
      setJobs(jobsData);

      // Save jobs to AsyncStorage for offline access
      await AsyncStorage.setItem('jobs', JSON.stringify(jobsData));

      // In a real app, send user data to backend to store in MongoDB
      // await fetch('http://your-backend-url/save-user', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
    } catch (error) {
      setError('Google login failed');
    }
  };

  // Regular login function
  const login = async () => {
    if (username === '' || password === '') {
      setError('Please enter both username and password');
      return;
    }
    setError('');
    const userData = { name: username, email: '', profilePicture: '' };
    setUser(userData);
    setIsLoggedIn(true);

    // Mock fetching jobs (in a real app, fetch from backend)
    const jobsData = mockJobs;
    setJobs(jobsData);

    // Save jobs to AsyncStorage for offline access
    await AsyncStorage.setItem('jobs', JSON.stringify(jobsData));

    // In a real app, you could save user data to backend here
  };

  // Render login screen
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login to Job Listings</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={login} color="#007AFF" />
        <View style={styles.googleButton}>
          <Button title="Login with Google" onPress={googleLogin} color="#4285F4" />
        </View>
      </View>
    );
  }

  // Render job listings screen
  return (
    <View style={styles.container}>
      <View style={styles.userHeader}>
        {user?.profilePicture ? (
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profilePicture}
          />
        ) : null}
        <Text style={styles.userName}>Welcome, {user?.name || 'User'}!</Text>
      </View>
      <Text style={styles.title}>Job Listings</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text style={styles.jobDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No jobs available</Text>}
      />
      <Button
        title="Logout"
        onPress={async () => {
          setIsLoggedIn(false);
          setUsername('');
          setPassword('');
          setJobs([]);
          setUser(null);
          await AsyncStorage.removeItem('jobs'); // Clear stored jobs on logout
        }}
        color="#FF3B30"
      />
    </View>
  );
}

// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  googleButton: {
    marginTop: 10,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  jobCompany: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  jobDescription: {
    fontSize: 14,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});