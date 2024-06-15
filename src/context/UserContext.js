import tempServerApi from "../utilities/api/tempServerApi";
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
                profPic: action.payload.userImages[0], 
                bio: action.payload.bio,
                preferences: {}, 
                pets: { 
                    petId: action.payload.petId,
                    petName: action.payload.petName,
                    type: action.payload.petType,
                    breed: action.payload.breedType,
                    age: action.payload.petAge,
                    petPics: action.payload.images,
                    bio: action.payload.petBio,
                    healthInfo: action.payload.healthInfo,
                } 
            };
        case 'add_error': 
            return { ...state, errorMessage: action.payload }
        default: 
            return state;
    } 
} 

const fetchUserData = (dispatch) => () => {

} 

const createUser = (dispatch) => async ({email, petName, petType, breedType, petAge, images, petBio, healthInfo, name, age, location, userImages, bio}) => { 
    try {
        const userId = uuid.v4();
        const petId = uuid.v4();
        const userPayload = {
            userId,
            email,
            name,
            age,
            location,
            profPic: userImages[0], // Profile picture
            bio,
            preferences: {}, // Preferences are empty initially 
            pets: {
                petId,
                petName,
                type: petType,
                breed: breedType,
                age: petAge,
                petPics: images,
                bio: petBio,
                healthInfo,
            }
        };

        await tempServerApi.post('/createuser', userPayload);

        dispatch({ 
            type: 'createUser',
            payload: userPayload
        }); 

        navigationRef.navigate('MainStack'); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Failed creating a user' }); 
    } 
} 

const updateUser = (dispatch) => () => {

} 

const deleteUser = (dispatch) => () => {

} 

// password should be the JWT, preferences outlines user's match preferences for their pet 
export const { Provider, Context } = createDataContext(
    userReducer, 
    { createUser, fetchUserData, updateUser, deleteUser }, 
    { userId: '', email: '', name: '', age: '', location: '', profPic: '', bio: '',  
        preferences: {}, 
        pets: {
            petId: '', petName: '', type: '', breed: '', age: '', petPics: [], bio: '', healthInfo: [], 
        }, errorMessage: '' }
); 