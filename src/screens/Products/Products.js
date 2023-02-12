import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../store/slice/product-slice';

const {width, height} = Dimensions.get('window');

const Products = ({navigation}) => {
  const dispatch = useDispatch();
  const {uid} = useSelector(state => state.auth);
  const {products} = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts(uid));
  }, [uid, products]);

  const ProductList = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewProduct', {data: item})}
        style={{
          alignItems: 'center',
          padding: 5,
          borderRadius: 10,
          backgroundColor: '#dedede',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          flexDirection: 'row',
          elevation: 4,
        }}>
        <Image
          source={{uri: item.image_url}}
          resizeMode="contain"
          style={{
            width: '40%',
            height: 150,
            borderRadius: 10,
          }}
        />

        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              marginVertical: 10,
              fontSize: width * 0.04,
            }}>
            Name: {item.name}
          </Text>

          <Text
            style={{
              color: 'black',
              marginVertical: 10,
              fontSize: width * 0.04,
            }}>
            Price: Rs.{item.price}
          </Text>

          <Text
            style={{
              color: 'black',
              marginVertical: 10,
              fontSize: width * 0.04,
            }}>
            Offer Price: Rs.{item.offerPrice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {products.length === 0 ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{color: '#041234', fontSize: width * 0.04}}>
            No products available!
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: '#041234',
              fontWeight: 'bold',
              fontSize: width * 0.06,
              textAlign: 'center',
              marginVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#041234',
              marginHorizontal: 20,
            }}>
            All Products
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            data={products}
            renderItem={ProductList}
          />
        </View>
      )}
    </View>
  );
};

export default Products;
