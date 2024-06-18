import { db } from '../utilities/api/firebase';
import { collection, query, where, getDocs, getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import * as Location from 'expo-location'; 
import { navigationRef } from "../utilities/navigation/NavigationService";
import createDataContext from "./createDataContext"; 
import uuid from 'react-native-uuid'; 

const userReducer = (state, action) => { 
    switch (action.type) {
        case 'createUser': 
            return { 
                ...state,
                userId: action.payload.userId,
                email: action.payload.email,
                name: action.payload.name,
                age: action.payload.age,
                location: action.payload.location, 
                userImages: action.payload.userImages || [], 
                bio: action.payload.bio,
                preferences: {}, 
                pets: action.payload.pets && action.payload.pets.length > 0 ? [action.payload.pets[0]] : [] 
            };
        case 'load_user_data': 
            return { 
                ...state,
                ...action.payload 
            }; 
        case 'set_carousel_users':
            return {
                ...state,
                carouselUsers: action.payload
            };
        case 'record_decision':
            return {
                ...state,
                decisions: {
                    ...state.decisions,
                    [action.payload.targetUserId]: action.payload.decisionType
                }
            };
        case 'update_location':
            return { ...state, actualLocation: action.payload }; 
        case 'set_matches':
            return {
                ...state,
                matches: action.payload
            };
        case 'add_error': 
            return { ...state, errorMessage: action.payload }
        default: 
            return state;
    } 
}; 

const createUser = (dispatch) => async ({email, petName, petType, breedType, petAge, images, petBio, healthInfo, name, age, location, userImages, bio}) => {
    if (!db) {
        dispatch({ type: 'add_error', payload: 'Database not initialized' });
        return;
    }

    if (!userImages || userImages.length === 0) {
        dispatch({ type: 'add_error', payload: 'User images are required' });
        return;
    }

    const locationData = await getLocationAsync(dispatch);
    console.log(locationData); 
    if (!locationData) {
        // Handle error or decide to proceed without location
        console.log('Proceeding without location data');
    }

    try {
        const userId = uuid.v4();
        const petId = uuid.v4();
        const userPayload = {
            userId,
            email,
            name,
            age: Number(age),
            location: locationData, 
            userImages: userImages,
            bio,
            preferences: {},
            pets: [{
                petId,
                petName,
                type: petType,
                breed: breedType,
                petAge: Number(petAge),
                petPics: images,
                bio: petBio,
                healthInfo,
            }]
        };

        await setDoc(doc(db, 'usersInfo', userId), userPayload);
        dispatch({ type: 'createUser', payload: userPayload });
        navigationRef.navigate('MainStack');
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.message || 'Failed creating a user' });
    }
};

const fetchUserDataByEmail = (dispatch) => async (email) => { // used in sign in 
    try {
        const usersRef = collection(db, 'usersInfo');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            dispatch({
                type: 'load_user_data',
                payload: userDoc.data()
            });
        } else {
            console.log("No such user document!");
            dispatch({ type: 'add_error', payload: 'No user data found' });
        }
    } catch (err) {
        console.error("Error fetching user data by email: ", err);
        dispatch({ type: 'add_error', payload: 'Failed to fetch user data' });
    }
}; 

const updateUser = (dispatch) => () => {
    // Implement update user logic here
};

const deleteUser = (dispatch) => () => {
    // Implement delete user logic here
};

const recordDecision = (dispatch) => async (userId, targetUserId, decisionType) => {
    try {
        const decisionPath = doc(db, 'users', userId, 'decisions', targetUserId);
        const decisionData = {
            type: decisionType, // 'like' or 'pass'
            timestamp: serverTimestamp()
        };

        await setDoc(decisionPath, decisionData);

        dispatch({
            type: 'record_decision',
            payload: { targetUserId, decisionType }
        });
    } catch (err) {
        console.error("Error recording decision: ", err);
        dispatch({ type: 'add_error', payload: 'Failed to record decision' });
    }
};  

const fetchUsersForCarousel = (dispatch) => async (currentUserId) => {
    try {
        const currentUserRef = doc(db, 'usersInfo', currentUserId);
        const currentUserDoc = await getDoc(currentUserRef);
        if (!currentUserDoc.exists()) {
            console.log("Current user document does not exist");
            return;
        }
        const currentUserData = currentUserDoc.data();
        const { latitude, longitude } = currentUserData.location;

        // Define the geographical range
        const latRange = 0.07; // Roughly equal to 5 miles
        const longRange = 0.07; // Roughly equal to 5 miles
        const minLat = latitude - latRange;
        const maxLat = latitude + latRange;
        const minLong = longitude - longRange;
        const maxLong = longitude + longRange;

        // Fetch decisions to get the IDs of excluded users
        const decisionsRef = collection(db, 'users', currentUserId, 'decisions');
        const decisionsSnapshot = await getDocs(decisionsRef);
        const excludedUserIds = decisionsSnapshot.docs.map(doc => doc.id);
        excludedUserIds.push(currentUserId); // Also exclude the current user's ID

        // Query for users within the geographical range
        const usersRef = collection(db, 'usersInfo');
        const geoQuery = query(usersRef,
            where('location.latitude', '>=', minLat),
            where('location.latitude', '<=', maxLat),
            where('location.longitude', '>=', minLong),
            where('location.longitude', '<=', maxLong)
        );

        const querySnapshot = await getDocs(geoQuery);

        const nearbyUsers = [];
        querySnapshot.forEach(doc => {
            if (!excludedUserIds.includes(doc.id)) { // Exclude users based on decisions and current user
                nearbyUsers.push(doc.data());
            }
        });

        dispatch({
            type: 'set_carousel_users',
            payload: nearbyUsers
        });
    } catch (err) {
        console.error("Error fetching users for carousel: ", err);
        dispatch({ type: 'add_error', payload: 'Failed to fetch users for carousel' });
    }
}; 

const getLocationAsync = async (dispatch) => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch({ type: 'add_error', payload: 'Permission to access location was denied' });
        return;
      }
  
      // Get the current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
  
      // Optionally, store the location in the user's state or context
      dispatch({ type: 'update_location', payload: { latitude, longitude } });
  
      // Return the location data
      return { latitude, longitude };
    } catch (error) {
      dispatch({ type: 'add_error', payload: 'Failed to get location' });
      console.error(error);
    }
}; 

const storeLocationInFirestore = async (userId, location, db) => {
    try {
      const userRef = doc(db, 'usersInfo', userId);
      await setDoc(userRef, { location }, { merge: true });
      console.log('Location updated in Firestore');
    } catch (error) {
      console.error('Error updating location in Firestore:', error);
    }
  }; 

  const fetchMatches = (dispatch) => async (currentUserId) => {
    try {
        // Fetch current user's decisions where they liked someone
        const currentUserDecisionsRef = collection(db, 'users', currentUserId, 'decisions');
        const currentUserDecisionsSnapshot = await getDocs(currentUserDecisionsRef);
        const likedUserIds = currentUserDecisionsSnapshot.docs
            .filter(doc => doc.data().type.toLowerCase() === 'like')  // Ensure case insensitivity
            .map(doc => doc.id);

        console.log("Liked User IDs:", likedUserIds); // Debugging log

        const potentialMatches = [];

        // Check if these liked users also liked the current user
        for (const targetUserId of likedUserIds) {
            const targetUserDecisionsRef = collection(db, 'users', targetUserId, 'decisions');
            const targetUserDecisionsSnapshot = await getDocs(targetUserDecisionsRef);
            const targetUserLikesCurrentUser = targetUserDecisionsSnapshot.docs
                .some(doc => doc.id === currentUserId && doc.data().type.toLowerCase() === 'like');

            if (targetUserLikesCurrentUser) {
                potentialMatches.push(targetUserId);
            }
        }

        console.log("Potential Matches:", potentialMatches); // Debugging log

        // Fetch user details for each match
        const matches = [];
        for (const userId of potentialMatches) {
            const userDocRef = doc(db, 'usersInfo', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                matches.push(userDoc.data());
            }
        }

        console.log("Final Matches:", matches); // Debugging log

        // Dispatch the matches to the state
        dispatch({
            type: 'set_matches',
            payload: matches
        });
    } catch (err) {
        console.error("Error fetching matches: ", err);
        dispatch({ type: 'add_error', payload: 'Failed to fetch matches' });
    }
}; 

export const { Provider, Context } = createDataContext(
    userReducer, 
    { createUser, fetchUserDataByEmail, updateUser, deleteUser, recordDecision, fetchUsersForCarousel, fetchMatches }, 
    { userId: '', email: '', name: '', age: '', location: '', userImages: [], bio: '',  
        preferences: {}, 
        pets: [{
            petId: '', petName: '', type: '', breed: '', petAge: '', petPics: [], bio: '', healthInfo: "", 
        }], decisions: {}, actualLocation: {}, errorMessage: '', matches: [] } 
); 