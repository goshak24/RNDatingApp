import createDataContext from './createDataContext';
import { collection, addDoc, getDocs, getDoc, query, where, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utilities/api/firebase'; // Ensure this path is correct

const chatReducer = (state, action) => {
    switch (action.type) {
        case 'set_chat_data':
            return { ...state, ...action.payload };
        case 'add_message':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'update_last_message':
            return { ...state, lastMessage: action.payload };
        case 'clear_chat':
            return { chatId: '', participantIds: [], messageId: '', senderId: '', messages: [], lastMessage: '' };
        default:
            return state;
    }
};

// Actions
const initializeChat = (dispatch) => async (chatId) => {
    const chatRef = doc(db, 'chats', chatId);
    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
        dispatch({ type: 'set_chat_data', payload: chatSnap.data() });
    } else {
        console.log('Chat not found');
    }
};

const sendMessage = (dispatch) => async (chatId, senderId, text) => {
    const messageRef = collection(db, 'chats', chatId, 'messages');
    const newMessage = {
        senderId,
        text,
        timestamp: serverTimestamp()
    };
    await addDoc(messageRef, newMessage);
    dispatch({ type: 'add_message', payload: newMessage });
};

const loadMessages = (dispatch) => async (chatId) => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => doc.data());
    dispatch({ type: 'set_chat_data', payload: { messages } });
};

const updateLastMessage = (dispatch) => async (chatId, lastMessage) => {
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, { lastMessage });
    dispatch({ type: 'update_last_message', payload: lastMessage });
};

const clearChat = (dispatch) => () => {
    dispatch({ type: 'clear_chat' });
}; 

export const { Provider, Context } = createDataContext(
    chatReducer, 
    { initializeChat, sendMessage, loadMessages, updateLastMessage, clearChat }, 
    { chatId: '', participantIds: [], messageId: '', senderId: '', messages: [], lastMessage: '' } 
); 