import createDataContext from "./createDataContext";

const userReducer = (state, action) => {
    switch (action.type) {
        default: 
        return 
    } 
} 

const fetchUserData = (dispatch) => () => {

} 

const updateUser = (dispatch) => () => {

} 

const deleteUser = (dispatch) => () => {

} 

// password should be the JWT, preferences outlines user's match preferences for their pet 
export const { Provider, Context } = createDataContext(
    userReducer, 
    { fetchUserData, updateUser, deleteUser }, 
    { userId: '', email: '', name: '', age: '', location: '', profPic: '', bio: '',  
        preferences: {}, 
        pets: {
            petId: '', petName: '', type: '', breed: '', age: '', petPics: [], bio: '', healthInfo: [], 
        }}
); 