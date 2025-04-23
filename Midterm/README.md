Overview
A full-stack React Native app for job listings with social authentication, MongoDB integration, and offline support.
Key Features
Frontend: React Native app with regular login, Google Sign-In, job listings in FlatList, AsyncStorage for offline access, user data display.

Backend: Node.js + MongoDB to fetch/store job listings and user data (name, email, profile picture).

Social Auth: Google Sign-In with user data storage in MongoDB.

Offline Support: Job listings saved in AsyncStorage.

Project Structure
JobListings/: Backend (server.js) and frontend (App.js) for job listings.
SocialAuth/: Updated frontend (App.js) with Google Sign-In and offline storage.

Technologies
Frontend: React Native, Expo, @react-native-async-storage/async-storage, @react-native-google-signin/google-signin.
Backend: Node.js, Express, MongoDB, Axios.
Setup
Backend:
cd JobListings/backend
npm install
Run MongoDB, then node server.js
Fetch jobs: http://localhost:3000/fetch-jobs

Frontend:
cd SocialAuth
npm install
Update Google Sign-In webClientId and backend URL in App.js
npx expo start

Usage
Login with username/password or Google Sign-In.
View job listings, saved offline with AsyncStorage.
Logout to clear data.

> Why do I have a folder named ".expo" in my project?
The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?
- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
> Should I commit the ".expo" folder?
No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
Upon project creation, the ".expo" folder is already added to your ".gitignore" file.
