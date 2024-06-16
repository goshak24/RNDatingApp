import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Ensure you have installed this package
import { Context as UserContext } from '../context/UserContext'; // Adjust path as necessary

const PetCarousel = () => {
  const { state, fetchUsersForCarousel } = useContext(UserContext);
  const { userId, carouselUsers } = state; // Assuming carouselUsers is added to your state by the reducer

  useEffect(() => {
    if (userId) {
      fetchUsersForCarousel(userId);
    }
  }, [userId]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio}>{item.bio}</Text>
        {/* Add more details as needed */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselUsers}
        renderItem={renderItem}
        sliderWidth={300} // Adjust based on your layout
        itemWidth={300} // Adjust based on your layout
      />
    </View>
  );
};

export default PetCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
  },
}); 