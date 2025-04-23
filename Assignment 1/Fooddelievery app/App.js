import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Theme
const theme = {
  primaryColor: '#FF6347', // Tomato
  backgroundColor: '#F5F5F5',
  textColor: '#333',
  secondaryTextColor: '#888',
};

// Dummy data for food categories and items
const foodCategories = [
  {
    id: '1',
    name: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const foodItems = [
  {
    id: '1',
    category: 'Burgers',
    name: 'Cheeseburger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 8.99,
    description: 'A delicious cheeseburger with fresh lettuce, tomato, and cheddar cheese. Perfectly grilled to perfection.',
    quality: 'Made with 100% organic beef and fresh ingredients.',
  },
  {
    id: '2',
    category: 'Pizza',
    name: 'Pepperoni Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 12.99,
    description: 'Classic pepperoni pizza with a crispy crust and melted mozzarella. Topped with fresh herbs and spices.',
    quality: 'Hand-tossed dough and premium pepperoni.',
  },
  {
    id: '3',
    category: 'Sushi',
    name: 'Sushi Platter',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 18.99,
    description: 'A variety of sushi rolls with fresh fish and authentic Japanese flavors. Served with soy sauce and wasabi.',
    quality: 'Prepared by expert sushi chefs with the freshest ingredients.',
  },
  {
    id: '4',
    category: 'Desserts',
    name: 'Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 6.99,
    description: 'Rich and moist chocolate cake with a creamy frosting. Perfect for satisfying your sweet tooth.',
    quality: 'Made with premium cocoa and fresh dairy.',
  },
];

// Orders Screen
const OrdersScreen = ({ route }) => {
  const { orders } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Orders</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartImage} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.cartQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Cart Screen
const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [orders, setOrders] = useState([]);

  const placeOrder = () => {
    setOrders([...cart]);
    alert('Order placed successfully!');
    navigation.navigate('Orders', { orders: [...cart] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartImage} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.cartQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Place Order" onPress={placeOrder} color={theme.primaryColor} />
    </View>
  );
};

// Food Details Screen
const FoodDetailsScreen = ({ route, navigation }) => {
  const { food } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    navigation.navigate('Cart', { cart: [{ ...food, quantity }] });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: food.image }} style={styles.foodImage} />
      <Text style={styles.foodName}>{food.name}</Text>
      <Text style={styles.foodPrice}>${food.price.toFixed(2)}</Text>
      <Text style={styles.foodDescription}>{food.description}</Text>
      <Text style={styles.qualityText}>Quality: {food.quality}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(Number(text))}
        />
      </View>
      <Button title="Add to Cart" onPress={addToCart} color={theme.primaryColor} />
    </ScrollView>
  );
};

// Categories Screen
const CategoriesScreen = ({ navigation }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FoodList', { category: item.name })}>
      <View style={styles.categoryItem}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foodCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Food List Screen
const FoodListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const filteredFoodItems = foodItems.filter((item) => item.category === category);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', { food: item })}>
      <View style={styles.foodItem}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <View style={styles.foodDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFoodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Navigation Stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Categories"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Food Categories' }} />
        <Stack.Screen name="FoodList" component={FoodListScreen} options={{ title: 'Food List' }} />
        <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: 'Food Details' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Orders' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.backgroundColor,
  },
  categoryItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 150,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    color: theme.textColor,
  },
  foodItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 150,
  },
  foodDetails: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  foodPrice: {
    fontSize: 16,
    color: theme.secondaryTextColor,
  },
  foodDescription: {
    fontSize: 16,
    marginTop: 8,
    color: theme.textColor,
  },
  qualityText: {
    fontSize: 14,
    color: theme.secondaryTextColor,
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 8,
    color: theme.textColor,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    width: 60,
    color: theme.textColor,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.textColor,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartDetails: {
    marginLeft: 16,
  },
  cartName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  cartPrice: {
    fontSize: 14,
    color: theme.secondaryTextColor,
  },
  cartQuantity: {
    fontSize: 14,
    color: theme.secondaryTextColor,
  },
});