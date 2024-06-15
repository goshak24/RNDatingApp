import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState, useContext } from 'react';
import { ReusableText, ReusableTouchable, HeightSpacer } from '../../../components';
import * as ImagePicker from 'expo-image-picker';
import { Context as UserContext } from '../../../context/UserContext'; 

const SignUp7 = ({ route }) => { 
  const { email, petName, petType, breedType, petAge, images, petBio, healthInfo, name, age, location } = route.params;
  const { state, createUser } = useContext(UserContext); 
  const [userImages, setUserImages] = useState([null, null]);
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState('');

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const handleImagePick = async (index) => {
    await requestPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...userImages];
      newImages[index] = result.assets[0].uri;
      setUserImages(newImages);
    }
  };

  // edit this to save information to the user context and navigate to the main dashboard as sign up is complete 
  const handleSubmit = () => {
    if (userImages.some(image => image === null)) {
      setErrors('Please upload both pictures and enter your bio (optional)'); 
    } else {
      setErrors('');
      createUser({ email, petName, petType, breedType, petAge, images, petBio, healthInfo, name, age, location, userImages, bio }); 
    }
  }; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ReusableText text="Upload 2 pictures of yourself" color="black" fontSize={20} />
      <HeightSpacer height={20} />
      <View style={styles.imageContainer}>
        {userImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePick(index)} style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <ReusableText text={`Upload Image ${index + 1}`} color="blue" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <HeightSpacer height={20} />
      <ReusableTouchable btnText="Submit" onPress={handleSubmit} width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" />
      {errors ? <Text style={styles.errorText}>{errors}</Text> : null}
      {state.errorMessage ? <Text style={styles.errorText}>{state.errorMessage}</Text> : null} 
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    margin: 5, 
    width: '47.5%',
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
  },
}); 