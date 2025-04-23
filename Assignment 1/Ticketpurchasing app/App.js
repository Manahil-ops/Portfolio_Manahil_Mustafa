import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const tickets = [
  {
    id: 1,
    name: 'General Admission',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Concert image
    price: '$50',
  },
  {
    id: 2,
    name: 'VIP Pass',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', // VIP event image
    price: '$100',
  },
  {
    id: 3,
    name: 'Family Pack',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80', // Family event image
    price: '$150',
  },
  {
    id: 4,
    name: 'Student Discount',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', // Student event image
    price: '$30',
  },
];

const App = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search tickets..."
        placeholderTextColor="#999"
      />

      {/* Scrollable Ticket List */}
      <ScrollView style={styles.scrollView}>
        {tickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketContainer}>
            <Image source={{ uri: ticket.image }} style={styles.ticketImage} />
            <Text style={styles.ticketName}>{ticket.name}</Text>
            <Text style={styles.ticketPrice}>{ticket.price}</Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Event Details</Text>
          <Text style={styles.detailsText}>
            Join us at the Snack Expo 2023 for a day full of delicious snacks, fun activities, and exclusive offers!
          </Text>
          <Text style={styles.detailsText}>Date: November 15, 2023</Text>
          <Text style={styles.detailsText}>Location: Expo Center, New York</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  ticketContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  ticketName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketPrice: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  buyButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});

export default App;