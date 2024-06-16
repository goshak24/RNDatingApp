import { StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { ReusableText, ReusableTouchable, HeightSpacer } from '../../../components';
import * as ImagePicker from 'expo-image-picker';
import { navigationRef } from '../../../utilities/navigation/NavigationService';

const SignUp3 = ({ route }) => {
  const { email, petName, petType, breedType, petAge } = route.params;
  const [images, setImages] = useState([null, null, null, null]);
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
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
    }
  };

  const handleSubmit = () => {
    if (images.some(image => image === null)) {
      setErrors('Please upload all 4 pictures');
    } else {
      setErrors(''); 
      navigationRef.navigate('SignUp4', { email, petName, petType, breedType, petAge, images });
    }
  }; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ReusableText text="Upload 4 pictures of your pet" color="black" fontSize={20} />
      <HeightSpacer height={20} />
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePick(index)} style={styles.imageWrapper}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <ReusableText text={`Upload Image ${index + 1}`} color="blue" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      {errors ? <ReusableText text={errors} color="red" /> : null}
      <ReusableTouchable
        btnText="Submit"
        onPress={handleSubmit}
        width={200}
        textColor="white"
        backgroundColor="red"
        borderWidth={1}
        borderColor="red"
      />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
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
}); 