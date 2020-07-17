import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceLevel from './PriceLevel';

const RestaurantInfo = ({ restaurants, index, showDetails }) => {
  const [stars, setStars] = useState([]);

  const createStars = useCallback(() => {
    const afterDecimal = restaurants[index].rating.toString().slice(2);
    const wholeNumber = Math.floor(restaurants[index].rating);
    let starArray = [];

    for (var i = 1; i <= 5; i++) {
      if (i <= wholeNumber) {
        starArray.push('star');
      } else if (afterDecimal >= 8) {
        starArray.push('star');
      } else if (afterDecimal <= 7 && afterDecimal >= 3) {
        starArray.push('star-half');
      } else {
        starArray.push('star-border');
      }
    }
    setStars(starArray);
  }, [restaurants, index]);

  useEffect(() => {
    createStars();
  }, [createStars, restaurants]);

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurants[index].name}</Text>
      <View style={styles.ratingContainer}>
        <Icon name={stars[0]} size={25} color="gold" />
        <Icon name={stars[1]} size={25} color="gold" />
        <Icon name={stars[2]} size={25} color="gold" />
        <Icon name={stars[3]} size={25} color="gold" />
        <Icon name={stars[4]} size={25} color="gold" />
      </View>
      <PriceLevel restaurants={restaurants} index={index} />
      {!showDetails ? (
        <Text>
          Address: {'\n'}
          {restaurants[index].formatted_address}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default RestaurantInfo;