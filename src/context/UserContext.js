import { db } from '../utilities/api/firebase';
import { collection, query, where, getDocs, setDoc } from 'firebase/firestore';
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
        case 'load_user_data': // loads user data on sign in into state 
            return { 
                ...state,
                ...action.payload 
            }; 
        case 'record_decision':
            return {
                ...state,
                decisions: {
                    ...state.decisions,
                    [action.payload.targetUserId]: action.payload.decisionType
                }
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

    try {
        const userId = uuid.v4();
        const petId = uuid.v4();
        const userPayload = {
            userId,
            email,
            name,
            age: Number(age), 
            location,
            userImages: userImages, 
            bio,
            preferences: {}, // Preferences are empty initially 
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

        // Store user data in Firestore using the new modular approach
        await setDoc(doc(db, 'usersInfo', userId), userPayload);

        dispatch({ 
            type: 'createUser',
            payload: userPayload
        }); 

        navigationRef.navigate('MainStack'); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: err.message || 'Failed creating a user' }); 
    } 
}; 

const fetchUserDataByEmail = (dispatch) => async (email) => {
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
        // First, fetch the decisions to get the IDs of excluded users
        const decisionsRef = collection(db, 'users', currentUserId, 'decisions');
        const decisionsSnapshot = await getDocs(decisionsRef);
        const excludedUserIds = decisionsSnapshot.docs.map(doc => doc.id);
        excludedUserIds.push(currentUserId); // Also exclude the current user's ID

        // Now, fetch other users excluding the ones in excludedUserIds
        const usersRef = collection(db, 'usersInfo');
        const q = query(usersRef, where(firebase.firestore.FieldPath.documentId(), 'not-in', excludedUserIds));
        const querySnapshot = await getDocs(q);

        const users = [];
        querySnapshot.forEach(doc => {
            users.push(doc.data());
        });

        // Dispatch an action to store these users in state or handle them as needed
        dispatch({
            type: 'set_carousel_users',
            payload: users
        });

    } catch (err) {
        console.error("Error fetching users for carousel: ", err);
        dispatch({ type: 'add_error', payload: 'Failed to fetch users for carousel' });
    }
}; 

export const { Provider, Context } = createDataContext(
    userReducer, 
    { createUser, fetchUserDataByEmail, updateUser, deleteUser, recordDecision, fetchUsersForCarousel }, 
    { userId: '', email: '', name: '', age: '', location: '', userImages: [], bio: '',  
        preferences: {}, 
        pets: [{
            petId: '', petName: '', type: '', breed: '', petAge: '', petPics: [], bio: '', healthInfo: "", 
        }], decisions: {}, errorMessage: '' } 
); 