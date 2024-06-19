import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView } from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import { ReusableText } from '../components/index'; 

const PetCarousel = () => {
  const { state, recordDecision, fetchUsersForCarousel } = useContext(UserContext);
  const { userId, carouselUsers } = state;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchUsersForCarousel(userId);
    }
  }, [userId]);

  const handleDecision = async (decisionType) => {
    if (carouselUsers && carouselUsers.length > 0) {
      const targetUserId = carouselUsers[currentIndex]?.userId;
      if (targetUserId) {
        await recordDecision(userId, targetUserId, decisionType);
        if (currentIndex < carouselUsers.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          fetchUsersForCarousel(userId);
          setCurrentIndex(0);
        }
      }
    }
  };

  if (!carouselUsers || carouselUsers.length === 0 || !carouselUsers[currentIndex]) {
    return <View style={styles.noPets}><ReusableText text="No Pets Available" /></View>;
  }

  const currentItem = carouselUsers[currentIndex];
  const pet = currentItem.pets && currentItem.pets[0];

  if (!pet) {
    return <View style={styles.noPets}><ReusableText text="No Pets Available" /></View>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>    
        <Image style={styles.image} source={{ uri: pet.petPics[0] }} />
          <View style={styles.overlay}>
            <ReusableText style={styles.text} text={`${pet.petName}, ${pet.petAge} Years Old`} color="white" fontSize={20} />
          </View>
        </View>

        <View style={styles.breedContainer}>
          <View style={styles.infoBox}>
            <ReusableText text={`Type: ${pet.type}`} color="black" fontSize={20} />
          </View>
          <View style={styles.infoBox}>
            <ReusableText text={`Breed: ${pet.breed}`} color="black" fontSize={20} />
          </View>
        </View>

        {pet.petPics.slice(1).map((pic, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: pic }} />
          </View>
        ))}

        <View style={styles.bioContainer}>
          <ReusableText text={pet.bio} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.passButton} onPress={() => handleDecision('pass')}>
          <Text>Pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={() => handleDecision('like')}>
          <Text>Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetCarousel; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flexGrow: 0,
    width: '100%',
  },
  imageContainer: {
    height: 325,
    width: '100%',
    marginBottom: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  passButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  },
  likeButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5
  }, 
  overlay: {
    justifyContent: "center",
    height: "15%",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  breedContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-around',
    marginBottom: 5
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5
  },
  bioContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 5,
    borderColor: 'gray',
    borderWidth: 1
  },
  noPets: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 20,
    color: 'white',
  }
}); 