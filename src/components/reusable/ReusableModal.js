import React, { useState } from 'react';
import { Modal, StyleSheet, Pressable, View, Text, ScrollView } from 'react-native';
import ReusableTouchable from './ReusableTouchable'; 

const ReusableModal = ({ modalText, optionsList = [], onSelect }) => { 
  const [modalVisible, setModalVisible] = useState(false); 

  const handleOptionSelect = (item) => {
    setModalVisible(!modalVisible); 
    if (onSelect) {
        onSelect(item);
    } 
  } 

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > 
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <ScrollView>
            {optionsList.map((item, index) => (
                <ReusableTouchable 
                    key={index} 
                    btnText={item} 
                    textColor="black" 
                    width={200} 
                    borderWidth={1} 
                    borderColor="gray" 
                    onPress={() => handleOptionSelect(item)} 
                /> 
            ))} 
            </ScrollView> 
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{modalText}</Text>
      </Pressable>
    </View>
  );
};

export default ReusableModal; 

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  option: {
    margin: 5,
    width: 200 
  }, 
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 200 
  },
  buttonOpen: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  textStyle: {
    textAlign: 'center',
  },
}); 