import createDataContext from "./createDataContext";
import tempServerApi from "../utilities/api/tempServerApi"; 
import { navigationRef } from "../utilities/navigation/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup': 
            return { errorMessage: '', token: action.payload, isSignUpComplete: false }
        case 'complete_signup':
            return { ...state, isSignUpComplete: true } 
        case 'signin': 
            return { errorMessage: '', token: action.payload, isSignUpComplete: true }
        case 'signout': 
            return { errorMessage: '', token: null, isSignUpComplete: false } 
        case 'add_error':
            return { ...state, errorMessage: action.payload } 
        default: 
            return state 
    }
} 

const tryLocalSignIn = (dispatch) => async () => { 
    const token = await AsyncStorage.getItem('token'); 
    const isSignUpComplete = await AsyncStorage.getItem('isSignUpComplete') === 'true';

    if (token) {
        dispatch({ type: 'signin', payload: token }); 
        if (isSignUpComplete) {
            navigationRef.navigate('MainStack');
        }
    } else {
        navigationRef.navigate('Onboarding');   
    }; 
} 

const signin = (dispatch) => async ({email, password}, callback) => {
    try {
        const response = await tempServerApi.post('/signin', {email, password})
        dispatch({ type: 'signin', payload: response.data.token }); 
        await AsyncStorage.setItem('token', response.data.token); 
        await AsyncStorage.setItem('isSignUpComplete', 'false');
        
        navigationRef.navigate('MainStack'); 
        if (callback) callback(); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Sign in failed' });
    }
    
} 

const signup = (dispatch) => async ({ email, password }) => {
    
    // General email syntax validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation for at least 8 characters and at least one uppercase letter 
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;


    if (!emailRegex.test(email)) {
        dispatch({ type: 'add_error', payload: 'Invalid email format' });
        return;
    }
    
    if (!passwordRegex.test(password)) {
        dispatch({ type: 'add_error', payload: 'Password needs atleast 8 characters an an uppercase letter' }); 
        return;
    } 

    try { 
    const response = await tempServerApi.post('/signup', { email, password });
        dispatch({ type: 'signup', payload: response.data.token })
        await AsyncStorage.setItem('token', response.data.token); 
        navigationRef.navigate('SignUp2', { email }); 
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Sign up failed' })
    } 

} 

const completeSignUp = (dispatch) => async () => {
    await AsyncStorage.setItem('isSignUpComplete', 'true');
    dispatch({ type: 'complete_signup' });
    navigationRef.navigate('MainStack');
} 

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token'); 
    dispatch({ type: 'signout' }); 
    navigationRef.navigate('Onboarding'); 
} 

export const { Provider, Context } = createDataContext(
    authReducer, 
    { signin, signup, signout, tryLocalSignIn, completeSignUp }, 
    { token: null, errorMessage: '', isSignUpComplete: false }
);  