import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from '../../store/slice/product-slice';
import RBSheet from 'react-native-raw-bottom-sheet';
import PickPhotoBottomSheet from '../../components/ImagePickerBottomSheet/ImagePickerBottomSheet';

import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import productImage from '../../assets/product.png';
import {
  imagePickerCamera,
  imagePickerGallery,
} from '../../utils/image/imagePicker';

const {width, height} = Dimensions.get('window');

const AddProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [imagePath, setImagePath] = useState(null);
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const {uid} = useSelector(state => state.auth);

  const bottomSheetHandle = () => {
    refRBSheet.current.open();
  };

  const handleImage = async pickerType => {
    const a =
      pickerType == 'camera' ? imagePickerCamera() : imagePickerGallery();
    a.then(path => {
      handleUploadImage(path);
    }).catch(error => {
      console.log(error);
    });
  };

  async function handleUploadImage(path) {
    const imageRef = storage().ref(`${path}/${name}`);
    await imageRef.putFile(path, {contentType: 'image/jpg'}).catch(error => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch(error => {
      throw error;
    });
    setImagePath(url);
  }

  const handleSubmit = () => {
    dispatch(
      addProduct({
        user_id: uid,
        name: name,
        price: price,
        offerPrice: offerPrice,
        image_url: imagePath,
      }),
    )
      .unwrap()
      .then(() => {
        navigation.navigate('Products');
      })
      .catch(e => {
        alert('Some Error Occured');
      });
  };

  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'black', fontSize: 18, margin: 10}}>
          Add your product
        </Text>

        {imagePath !== null ? (
          <Image
            source={{uri: imagePath}}
            style={{width: '80%', height: 200}}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={productImage}
            style={{width: '80%', height: 200}}
            resizeMode="contain"
          />
        )}

        <TouchableOpacity
          onPress={() => bottomSheetHandle()}
          style={{
            width: '50%',
            paddingVertical: 10,
            backgroundColor: '#041234',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={{color: '#fff'}}>Upload Image</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Product Name"
          placeholderTextColor={'gray'}
          mode="outlined"
          style={{width: width / 1.2, marginBottom: 10}}
          label={'Name'}
          onChangeText={val => {
            setName(val);
          }}
          value={name}
        />

        <TextInput
          placeholder="Product Price"
          placeholderTextColor={'gray'}
          mode="outlined"
          style={{width: width / 1.2, marginBottom: 10}}
          label={'Price'}
          onChangeText={val => {
            setPrice(val);
          }}
          value={price}
        />

        <TextInput
          placeholder="Offer Price"
          placeholderTextColor={'gray'}
          mode="outlined"
          style={{width: width / 1.2, marginBottom: 20}}
          label={'Offer Price'}
          onChangeText={val => {
            setOfferPrice(val);
          }}
          value={offerPrice}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            width: width / 2,
            paddingVertical: 10,
            backgroundColor: '#041234',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        onClose={pickerType => pickerType && handleImage(pickerType)}
        closeDuration={100}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          wrapper: {
            backgroundColor: 'gray',
            opacity: 0.8,
          },
          draggableIcon: {
            backgroundColor: 'black',
          },
        }}>
        <PickPhotoBottomSheet
          refRBSheet={refRBSheet}
          handleImage={handleImage}
        />
      </RBSheet>
    </>
  );
};

export default AddProduct;
