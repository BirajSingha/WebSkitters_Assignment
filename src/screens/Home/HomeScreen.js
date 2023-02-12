import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AddProductImg from '../../assets/buyCart.png';
import ViewProductImg from '../../assets/viewCart.png';
import {fetchUser} from '../../store/slice/user-slice';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const {uid} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchUser(uid));
  }, [uid]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#041234'} barStyle="light-content" />

      <View style={styles.headerSection}>
        <Text
          style={{
            color: 'black',
            fontSize: width * 0.07,
            fontWeight: '900',
            textAlign: 'center',
            letterSpacing: 2,
          }}>
          WEBSKITTERS
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AddProduct')}>
          <Image
            source={AddProductImg}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={{color: 'white', fontSize: width * 0.04}}>
            Add Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Products')}>
          <Image
            source={ViewProductImg}
            resizeMode="cover"
            style={[styles.image, {width: 120}]}
          />
          <Text style={{color: 'white', fontSize: width * 0.04}}>
            View Products
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  headerSection: {
    borderBottomWidth: 1,
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  card: {
    width: width / 2.2,
    paddingVertical: 20,
    backgroundColor: '#041234',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },

  image: {
    width: 100,
    height: 80,
    marginBottom: 5,
  },
});
