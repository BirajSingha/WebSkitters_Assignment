import ImagePicker from 'react-native-image-crop-picker';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const imagePickerCamera = async (type = null) => {
  let imagePath = '';
  await ImagePicker.openCamera({
    width: width,
    height: height / 2,
    cropping: true,
    freeStyleCropEnabled: true,
  }).then(image => {
    imagePath = image.path;
  });
  return imagePath;
};

const imagePickerGallery = async (type = null) => {
  let imagePath = '';
  await ImagePicker.openPicker({
    width: width,
    height: height / 2,
    cropping: true,
    freeStyleCropEnabled: true,
  }).then(image => {
    imagePath = image.path;
  });
  return imagePath;
};

export {imagePickerCamera, imagePickerGallery};
