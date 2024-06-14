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
    { userId: '', name: '', email: '', profPic: '', bio: '', location: '', 
        preferences: {}, 
        pets: {
            petId: '', petName: '', type: '', breed: '', age: '', petPics: [], healthInfo: [], bio: '' 
        }}
); 