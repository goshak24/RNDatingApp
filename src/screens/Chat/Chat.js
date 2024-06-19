import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Context as ChatContext } from '../../context/ChatContext';
import { Context as UserContext } from '../../context/UserContext';

const Chat = () => {
    const { state: chatState, initializeChat, sendMessage, loadMessages } = useContext(ChatContext);
    const { state: userState } = useContext(UserContext);
    const [text, setText] = useState('');
    const chatId = 'exampleChatId'; // This should be dynamically set based on your application logic

    useEffect(() => {
        initializeChat(chatId);
        loadMessages(chatId);
    }, []);

    const handleSend = () => {
        if (text) {
            sendMessage(chatId, userState.userId, userState.pets[0].petName, text); 
            setText('');
        }
    };

    const isCurrentUser = (userId) => {
        return userId === userState.userId;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chatState.messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.messageBox, isCurrentUser(item.senderId) ? styles.currentUserBg : styles.otherUserBg]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                        <Text style={styles.senderInfo}>
                            {isCurrentUser(item.senderId) ? userState.pets[0].petName : item.senderName} 
                        </Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    messageBox: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
    senderInfo: {
        fontSize: 12,
        color: '#666',
    },
    currentUserBg: {
        backgroundColor: '#dcf8c6',  // Light green background for current user
    },
    otherUserBg: {
        backgroundColor: '#f0f0f0',  // Light grey background for other users
    },
}); 