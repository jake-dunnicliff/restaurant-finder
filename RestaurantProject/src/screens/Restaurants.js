import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Details from '../components/Details';
import Photos from '../components/Photos';
import Matches from '../components/Matches';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <View style={styles.container}>
      <Matches index={index} />
      <Photos index={index} />
      <Details
        restaurants={route.params.restaurants}
        index={index}
        setIndex={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Restaurants;
