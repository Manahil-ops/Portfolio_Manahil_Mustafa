import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

// Sample data
const initialPosts = [
  {
    id: '1',
    username: 'john_doe',
    content: 'Enjoying a sunny day! 🌞',
    image: 'https://picsum.photos/400/300',
    likes: 15,
    comments: ['Great pic!', 'Looks amazing!'],
    timestamp: '2h ago'
  },
];

function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addPost = () => {
    if (postContent.trim() || image) {
      const newPost = {
        id: Date.now().toString(),
        username: 'current_user',
        content: postContent,
        image: image,
        likes: 0,
        comments: [],
        timestamp: 'Just now'
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
      setImage(null);
    }
  };

  const PostCard = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: 'https://picsum.photos/50' }} 
          style={styles.profilePic} 
        />
        <View>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Comments', { postId: item.id })}
        >
          <Text>💬 {item.comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>🔁 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SocialSphere</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={{ uri: 'https://picsum.photos/40' }} 
            style={styles.headerProfile} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.postInput}
          placeholder="What's on your mind?"
          value={postContent}
          onChangeText={setPostContent}
          multiline
        />
        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}
        <View style={styles.postOptions}>
          <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
            <Text>📸 Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text>🎥 Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text>🎉 Feeling</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={addPost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={PostCard}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://picsum.photos/100' }} 
          style={styles.profileLargePic} 
        />
        <Text style={styles.profileName}>Current User</Text>
        <Text style={styles.profileBio}>Living my best life! ✨ | Travel | Food | Tech</Text>
        <View style={styles.profileStats}>
          <Text>Posts: 42</Text>
          <Text>Followers: 1.2K</Text>
          <Text>Following: 350</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function CommentsScreen({ route }) {
  const [comment, setComment] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.commentsTitle}>Comments</Text>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  headerProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInputContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  postInput: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton: {
    padding: 8,
  },
  postButton: {
    backgroundColor: '#1877f2',
    padding: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 8,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileLargePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    padding: 10,
    backgroundColor: '#1877f2',
    borderRadius: 20,
  },
});