import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import React, { useContext } from 'react';
import { Context as UserContext } from '../../context/UserContext';
import { ReusableText } from '../../components/index'; 

const PetProfile = () => {
  const { state } = useContext(UserContext);
  const pet = state.pets[0];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: pet.petPics[0] }} />
          <View style={styles.overlay}>
            <ReusableText style={styles.text} text={`${pet.petName}, ${pet.petAge} Years Old`} color="white" fontSize={20} /> 
          </View>
        </View>

        { /* Need to add an about the owner section */ } 
        
        <View style={styles.breedContainer}> 
          <View style={styles.infoBox}>
            <Text style={styles.label}>Type:</Text>
            <ReusableText text={pet.type} color="black" fontSize={20} />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Breed:</Text>
            <ReusableText text={pet.breed} color="black" fontSize={20} />
          </View> 
          <View style={styles.infoBox}>
            <Text style={styles.label}>Word:</Text>
            <ReusableText text="Old" color="black" fontSize={20} /> 
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: pet.petPics[1] }} /> 
        </View> 

        <View style={styles.bioContainer}>
          <ReusableText text={pet.bio} /> 
        </View> 

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: pet.petPics[2] }} /> 
        </View> 

        {/* Add Addition Info */}

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: pet.petPics[3] }} /> 
        </View> 

      </View>
    </ScrollView>
  );
} 

export default PetProfile;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1, 
    padding: 12,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  imageContainer: {
    height: 325, 
    width: '100%',
    marginBottom: 10, 
  }, 
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover', 
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
    marginBottom: 10 
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: "gray", 
    borderWidth: 1,
    margin: 5,
  },
  label: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 5, // Space between label and value
  },
  bioContainer: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderColor: 'gray', 
    borderWidth: 1
  }
}); 