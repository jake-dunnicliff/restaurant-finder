import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../constants/NavConst';
import { useSelector } from 'react-redux';

const Photos = ({ index, photoIndex, showDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const details = useSelector(state => state.details);

  const handlePhotosModal = () => {
    setIsModalOpen(true);
  };

  const openModal = useCallback(() => {
    if (isModalOpen) {
      navigation.navigate(Routes.PhotosModal, {
        index: index,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
      });
    }
  }, [isModalOpen, navigation, index]);

  useEffect(() => {
    openModal();
  }, [openModal, isModalOpen]);

  return (
    <View>
      <TouchableHighlight underlayColor="#1C2938" onPress={handlePhotosModal}>
        <View style={styles.container}>
          <Image
            style={showDetails ? styles.condensed : styles.photo}
            source={{
              uri: details.details[index].photos[1].url
                ? details.details[index].photos[1].url
                : 'https://i.imgur.com/6nbpbTN.jpeg',
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  photo: {
    width: width / 1.3,
    height: width / 1.3,
    marginLeft: 5,
    marginRight: 5,
  },
  condensed: {
    width: (width - 10) / 2,
    height: (width - 10) / 2,
  },
});

export default Photos;
