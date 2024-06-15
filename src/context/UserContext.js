import { db } from '../utilities/api/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
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

const fetchUserData = (dispatch) => () => {
    // Implement fetch user data logic here
}; 

const updateUser = (dispatch) => () => {
    // Implement update user logic here
};

const deleteUser = (dispatch) => () => {
    // Implement delete user logic here
};

export const { Provider, Context } = createDataContext(
    userReducer, 
    { createUser, fetchUserData, updateUser, deleteUser }, 
    { userId: '', email: '', name: '', age: '', location: '', userImages: [], bio: '',  
        preferences: {}, 
        pets: [{
            petId: '', petName: '', type: '', breed: '', petAge: '', petPics: [], bio: '', healthInfo: "", 
        }], errorMessage: '' }
);