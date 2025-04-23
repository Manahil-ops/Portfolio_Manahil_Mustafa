import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Details", { post: item })}>
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text>User ID: {item.userId}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const DetailsScreen = ({ route }) => {
  const { post } = route.params;
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{post.title}</Text>
      <Text>{post.body}</Text>
      <Text>User ID: {post.userId}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem("userProfile");
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
          const data = await response.json();
          setProfile({ name: data.name, email: data.email, phone: data.phone });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Profile</Text>
      <TextInput
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        editable={editing}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        editable={editing}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        editable={editing}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {editing ? (
        <Button title="Save" onPress={saveProfile} />
      ) : (
        <Button title="Edit" onPress={() => setEditing(true)} />
      )}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
