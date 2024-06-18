import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { Context as ChatContext } from '../../context/ChatContext';

const Chat = () => {
    const { state, initializeChat, sendMessage, loadMessages } = useContext(ChatContext);
    const [text, setText] = useState('');
    const chatId = 'exampleChatId'; // This should be dynamically set based on your application logic

    useEffect(() => {
        initializeChat(chatId);
        loadMessages(chatId);
    }, []);

    const handleSend = () => {
        if (text) {
            sendMessage(chatId, 'userId', text); // Replace 'userId' with the actual sender's user ID
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={state.messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageBox}>
                        <Text style={styles.messageText}>{item.text}</Text>
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
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
        borderRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
}); 