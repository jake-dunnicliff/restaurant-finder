import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import Expanded from '../../components/Details/Expanded';
import Photos from '../../components/Photos/Photos';
import Matches from '../../components/Matches/Matches';
import Details from '../../components/Details/Details';
import axios from 'axios';
import config from '../../../config';
import { getNext, getNextTwenty } from '../../API/getNextDetails';

const Restaurants = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [scrollReviewsToTop, setScrollReviewsToTop] = useState(false);
  const [customerRating, setCustomerRating] = useState([]);
  const [allCustomerRatings, setAllCustomerRatings] = useState([]);
  const [num, setNum] = useState(0);

  const MainAction = () => {
    if (route.params.restaurants[index + 1]) {
      getNext(route, axios, index, config);
      setIndex(index + 1);
      setShowDetails(false);
      setViewReviews(false);
      setCustomerRating([]);
      setAllCustomerRatings([]);
      setNum(0);
      setScrollReviewsToTop(true);
    } else {
      // TODO: better ending to list
      Alert.alert('End of List');
    }
    if (index === 15 || index === 35) {
      getNextTwenty(route, axios, index, config);
    }
  };

  // const RightActions = () => {
  // TODO: add selected data to database as a potential "match"
  // };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          MainAction();
        }
      }}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            MainAction();
            // RightActions();
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Matches index={index} />
          <Photos
            index={index}
            photos={route.params.restaurants[index].photos}
            showDetails={showDetails}
          />
          <Details
            restaurants={route.params.restaurants}
            index={index}
            showDetails={showDetails}
          />
          <Expanded
            restaurants={route.params.restaurants}
            index={index}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            viewReviews={viewReviews}
            setViewReviews={setViewReviews}
            customerRating={customerRating}
            setCustomerRating={setCustomerRating}
            allCustomerRatings={allCustomerRatings}
            setAllCustomerRatings={setAllCustomerRatings}
            num={num}
            setNum={setNum}
            scrollReviewsToTop={scrollReviewsToTop}
            setScrollReviewsToTop={setScrollReviewsToTop}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Restaurants;