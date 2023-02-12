import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {deleteProduct} from '../../store/slice/product-slice';

const {width, height} = Dimensions.get('window');

const ViewProduct = ({route}) => {
  const data = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(data.data.id))
      .unwrap()
      .then(() => {
        navigation.navigate('Products');
      });
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={{uri: data.data.image_url}}
        style={{
          width: '90%',
          height: '40%',
          marginVertical: 20,
          borderRadius: 10,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <Text
          style={{color: 'black', fontWeight: 'bold', fontSize: width * 0.04}}>
          Name :
        </Text>
        <Text style={{color: 'black', fontSize: width * 0.04}}>
          {data.data.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          marginVertical: 10,
        }}>
        <Text
          style={{color: 'black', fontWeight: 'bold', fontSize: width * 0.04}}>
          Price :
        </Text>

        <Text style={{color: 'black', fontSize: width * 0.04}}>
          Rs. {data.data.price}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        <Text
          style={{color: 'black', fontWeight: 'bold', fontSize: width * 0.04}}>
          Offer Price :
        </Text>
        <Text style={{color: 'black', fontSize: width * 0.04}}>
          Rs. {data.data.offerPrice}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProduct', {data: data.data})}
          style={{
            width: '45%',
            paddingVertical: 10,
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: width * 0.04}}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete()}
          style={{
            width: '45%',
            paddingVertical: 10,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: width * 0.04}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewProduct;
