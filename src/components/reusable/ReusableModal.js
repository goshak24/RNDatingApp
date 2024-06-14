import React, { useState } from 'react';
import { Modal, StyleSheet, Pressable, View, Text, ScrollView } from 'react-native';
import ReusableTouchable from './ReusableTouchable';

const ReusableModal = () => {
  const [modalVisible, setModalVisible] = useState(false); 

  const handleOptionSelect = () => {
    setModalVisible(!modalVisible); 
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
                <View style={styles.option}>
                    <ReusableTouchable onPress={handleOptionSelect} btnText="Cat" borderColor="gray" borderWidth={1} />
                </View>
                <View style={styles.option}>
                    <ReusableTouchable onPress={handleOptionSelect} btnText="Dog" borderColor="gray" borderWidth={1} />
                </View>
                <View style={styles.option}>
                    <ReusableTouchable onPress={handleOptionSelect} btnText="Rabbit" borderColor="gray" borderWidth={1} />
                </View>
                <View style={styles.option}>
                    <ReusableTouchable onPress={handleOptionSelect} btnText="Guinea Pig" borderColor="gray" borderWidth={1} />
                </View> 
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
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