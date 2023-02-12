import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import PickPhotoBottomSheet from '../../components/ImagePickerBottomSheet/ImagePickerBottomSheet';
import {
  imagePickerCamera,
  imagePickerGallery,
} from '../../utils/image/imagePicker';
import productImage from '../../assets/product.png';
import storage from '@react-native-firebase/storage';
import {editProducts} from '../../store/slice/product-slice';

const {width, height} = Dimensions.get('window');

const EditProduct = ({route}) => {
  const data = route.params;
  const [id, setId] = useState(data.data.id);
  const [name, setName] = useState(data.data.name);
  const [price, setPrice] = useState(data.data.price);
  const [offerPrice, setOfferPrice] = useState(data.data.offerPrice);
  const [image_url, setImage_url] = useState(data.data.image_url);
  const dispatch = useDispatch();
  const {uid} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const refRBSheet = useRef();

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
    setImage_url(url);
  }

  const handleSubmit = () => {
    dispatch(editProducts({name, price, offerPrice, price, id, image_url, uid}))
      .unwrap()
      .then(() => {
        navigation.navigate('Products');
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {image_url !== null ? (
        <Image
          source={{uri: image_url}}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={productImage}
          style={{width: 200, height: 200}}
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
        <Text style={{color: '#fff', fontSize: width * 0.04}}>
          Upload Image
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Product Name"
        placeholderTextColor={'gray'}
        mode="outlined"
        style={{width: '80%', marginBottom: 10, fontSize: width * 0.04}}
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
        style={{width: '80%', marginBottom: 10, fontSize: width * 0.04}}
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
        style={{width: '80%', marginBottom: 20, fontSize: width * 0.04}}
        label={'Offer Price'}
        onChangeText={val => {
          setOfferPrice(val);
        }}
        value={offerPrice}
      />

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

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          width: '50%',
          paddingVertical: 10,
          backgroundColor: '#041234',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff', fontSize: width * 0.04}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProduct;
