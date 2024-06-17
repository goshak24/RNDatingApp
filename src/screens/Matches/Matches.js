import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { HeightSpacer, ReusableText } from '../../components'
import { Context as UserContext } from '../../context/UserContext'; 
import { navigationRef } from '../../utilities/navigation/NavigationService';

const Matches = () => {
  const { state, fetchMatches } = useContext(UserContext);
  const { matches } = state;

  useEffect(() => {
    fetchMatches(state.userId); 
  }, []);

  const handlePress = (userId) => {
    navigationRef.navigate('Chat', { userId }); 
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.userId)}>
        <View style={styles.matchItem}>
          <ReusableText text={item.name} fontSize={18} color="black" />
          <ReusableText text={item.bio} fontSize={18} color="grey" />
        </View>
      </TouchableOpacity>
    );
  }; 

  return (
    <View style={styles.container}>
      <ReusableText text="Matches" fontSize={24} color="black" />
      <HeightSpacer height={15} />
      {matches.length == 0 ? <ReusableText text="No matches yet" color="Black" fontSize={24} /> : null} 
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </View>
  );
}; 

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
    backgroundColor: '#fff', 
  },
  matchItem: {
    flexDirection: 'row', 
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0', 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center', 
    borderColor: 'black', 
    borderWidth: 1
  },
}); 