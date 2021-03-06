import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import LikeButton from '../../utils/LikeButton';
import DislikeButton from '../../utils/DislikeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ReviewScreen from '../../screens/Details/ReviewScreen';

const Expanded = ({
  index,
  showDetails,
  setShowDetails,
  viewReviews,
  setViewReviews,
  customerRating,
  setCustomerRating,
  allCustomerRatings,
  setAllCustomerRatings,
  num,
  setNum,
  scrollReviewsToTop,
  setScrollReviewsToTop,
  MainAction,
  RightActions,
}) => {
  const details = useSelector(state => state.details);

  const [reviewData, setReviewData] = useState([]);

  const updateReviewData = useCallback(() => {
    let temp = [];
    let nextNumber = 0;
    if (details.details[index].reviews) {
      const currentData = details.details[index].reviews;
      for (var i = 0; i < currentData.length; i++) {
        temp.push({
          author_name: currentData[i].author_name,
          rating: currentData[i].rating,
          relative_time_description: currentData[i].relative_time_description,
          text: currentData[i].text,
          next: nextNumber,
        });
        nextNumber++;
      }
      setReviewData(temp);
    }
  }, [details.details, index, setReviewData]);

  const allRatings = useCallback(() => {
    let temp = [];
    if (details.details[index].reviews) {
      const currentData = details.details[index].reviews;
      for (var i = 0; i < currentData.length; i++) {
        temp.push(currentData[i].rating);
      }
      setAllCustomerRatings(temp);
    }
  }, [details.details, index, setAllCustomerRatings]);

  const createStars = useCallback(() => {
    const wholeNumber = allCustomerRatings[num]
      ? allCustomerRatings[num]
      : null;
    let customerRatingArray = [];
    if (wholeNumber) {
      for (var i = 1; i <= 5; i++) {
        if (i <= wholeNumber) {
          customerRatingArray.push('star-sharp');
        } else {
          customerRatingArray.push('star-outline');
        }
      }
      setCustomerRating(oldArray => [...oldArray, customerRatingArray]);
      setNum(num + 1);
    }
  }, [allCustomerRatings, num, setCustomerRating, setNum]);

  useEffect(() => {
    createStars();
  }, [createStars, allRatings, details.details, viewReviews]);

  useEffect(() => {
    allRatings();
  }, [allRatings, viewReviews, details.details]);

  useEffect(() => {
    updateReviewData();
  }, [updateReviewData, details.details]);

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          setShowDetails(true);
        }
      }}>
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setShowDetails(false);
          }
        }}>
        <View style={styles.container}>
          <View style={styles.bottomDragContainer}>
            {showDetails ? (
              <View style={styles.viewDetailsContainer}>
                <Icon name="chevron-down-outline" size={25} color="#cb3737" />
                <Text style={styles.description}>Hide Details</Text>
                <Icon name="chevron-down-outline" size={25} color="#cb3737" />
              </View>
            ) : (
              <View style={styles.viewDetailsContainer}>
                <Icon name="chevron-up-outline" size={25} color="#cb3737" />
                <Text style={styles.description}>View Details</Text>
                <Icon name="chevron-up-outline" size={25} color="#cb3737" />
              </View>
            )}
          </View>
          <View style={[showDetails ? styles.display : styles.hide]}>
            {!viewReviews ? (
              <Text style={[styles.scheduleText, styles.text]}>
                {details.details[index].opening_hours.weekday_text[0]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[1]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[2]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[3]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[4]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[5]}
                {'\n'}
                {details.details[index].opening_hours.weekday_text[6]}
              </Text>
            ) : (
              <ReviewScreen
                customerRating={customerRating}
                allRatings={allRatings}
                num={num}
                viewReviews={viewReviews}
                index={index}
                reviewData={reviewData}
                scrollReviewsToTop={scrollReviewsToTop}
                setScrollReviewsToTop={setScrollReviewsToTop}
              />
            )}
          </View>
          <View style={styles.scheduleWithButtonsContainer}>
            <LikeButton
              size={50}
              MainAction={MainAction}
              RightActions={RightActions}
            />
            <DislikeButton size={50} MainAction={MainAction} />
          </View>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  display: {
    display: 'flex',
    width: width,
    flex: 1,
    paddingTop: 10,
  },
  hide: {
    display: 'none',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C2938',
  },
  text: {
    fontSize: 18,
  },
  scheduleText: {
    textAlign: 'center',
    color: '#1C2938',
  },
  bottomDragContainer: {
    width: width / 1.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#1C2938',
  },
  scheduleWithButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width,
    paddingTop: 10,
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Expanded;
