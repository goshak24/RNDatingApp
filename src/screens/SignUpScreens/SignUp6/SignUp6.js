import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { ReusableText, ReusableTouchable, HeightSpacer } from '../../../components';
import ReusableForm from '../../../components/reusable/ReusableForm'; 
import { navigationRef } from '../../../utilities/navigation/NavigationService'; 

const SignUp6 = ({ route }) => {
    const { email, petName, petType, breedType, petAge, images, petBio, healthInfo } = route.params; 
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState(''); 

  const fields = [
    {
      label: "Name",
      value: name,
      onChange: setName,
      placeholder: "Enter your name",
    },
    {
      label: "Age",
      value: age,
      onChange: setAge,
      placeholder: "Enter your age",
    },
    {
      label: "Location",
      value: location,
      onChange: setLocation,
      placeholder: "Enter your location",
    }
  ];

  const handleSubmit = () => {
    if (!email || !name || !age || !location) {
      setErrors("Not all information is entered");
    } else {
      navigationRef.navigate('SignUp7', { email, petName, petType, breedType, petAge, images, petBio, healthInfo, name, age, location });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ReusableForm fields={fields} />
      <HeightSpacer height={10} />
      <ReusableTouchable btnText="Next" onPress={handleSubmit} width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" />
      {errors ? <ReusableText text={errors} color="red" /> : null}
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp6

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }, 
}) 