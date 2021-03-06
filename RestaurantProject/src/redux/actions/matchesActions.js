export const setMatches = (
  restaurants,
  details,
  index,
  matches,
) => dispatch => {
  try {
    dispatch({
      type: 'RESET_MATCHES_COUNTER',
    });

    if (!restaurants && !index) {
      var counter = 0;
    }

    dispatch({
      type: 'SUCCESS_RESET',
      payload: {
        newMatchesCounter: counter ? counter : 0,
      },
    });

    dispatch({
      type: 'AWAITING_MATCHES',
    });

    let matchObj;
    if (!matches.matches) {
      matchObj = {};
      matchObj[restaurants[index]] = [index, 1];
    } else {
      matchObj = matches.matches;
      matchObj[restaurants[index]] = [index, 1];
    }

    let item,
      newMatches = [],
      next = 0;
    for (item in matchObj) {
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i] === item) {
          newMatches.push({
            formatted_phone_number: details[i].formatted_phone_number,
            opening_hours: details[i].opening_hours,
            photos: details[i].photos,
            reviews: details[i].reviews,
            website: details[i].website,
            formatted_address: details[i].formatted_address,
            name: details[i].name,
            price_level: details[i].price_level,
            rating: details[i].rating,
            user_ratings_total: details[i].user_ratings_total,
            nextStars: next,
          });
          next++;
        }
      }
    }

    dispatch({
      type: 'SUCCESS_MATCHES',
      payload: {
        matches: matchObj,
        displayMatches: newMatches,
        newMatchesCounter: matches.newMatchesCounter + 1,
      },
    });
  } catch (e) {
    dispatch({
      type: 'REJECTED_RESTAURANTS',
      // TODO: handle error D:
    });
  }
};
