import React, { useContext, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, ScrollView } from 'react-native';
import { Context as UserContext } from '../context/UserContext';
import { ReusableText } from '../components/index'; 

const PetCarousel = () => {
  const { state, fetchUsersForCarousel } = useContext(UserContext);
  const { userId, carouselUsers } = state;

  useEffect(() => {
    if (userId) {
      fetchUsersForCarousel(userId);
    }
  }, [userId]);

  const renderItem = ({ item }) => {
    if (!item.pets || item.pets.length === 0) {
      console.log('No pets available for this user:', item);
      return <View style={styles.noPets}><ReusableText text="No Pets Available" /></View>;
    }

    const pet = item.pets[0]; 

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
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
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselUsers}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.userId || String(index)}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
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