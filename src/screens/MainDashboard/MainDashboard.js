import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PetCarousel from '../../components/PetCarousel';

const MainDashboard = () => {

  return (
    <View style={styles.container}>
      <PetCarousel />
    </View>
  );
};

export default MainDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  passButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  }
}); 