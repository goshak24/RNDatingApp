import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PetCarousel from '../../components/PetCarousel';
import { Context as UserContext } from '../../context/UserContext'; 

const MainDashboard = () => {
  const { state, recordDecision, fetchUsersForCarousel } = useContext(UserContext);
  const { userId, carouselUsers } = state;

  const handleDecision = async (decisionType) => {
    if (carouselUsers.length > 0) {
      const targetUserId = carouselUsers[0].userId; // Assuming the first user in the carousel is the current target
      await recordDecision(userId, targetUserId, decisionType);
      fetchUsersForCarousel(userId); // Refresh the carousel to get the next user
    }
  };

  return (
    <View style={styles.container}>
      <PetCarousel />
      <TouchableOpacity style={styles.passButton} onPress={() => handleDecision('pass')}>
        <Text>Pass</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeButton} onPress={() => handleDecision('like')}>
        <Text>Like</Text>
      </TouchableOpacity>
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