import React from 'react';
import { Text, View } from 'react-native';
import PetCarousel from '../../components/PetCarousel'; 

const MainDashboard = () => {
  return (
    <View style={{ flex: 1 }}>  
      <PetCarousel />
    </View>
  );
};

export default MainDashboard; 