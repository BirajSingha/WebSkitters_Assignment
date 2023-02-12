import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const {isLoggedIn} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 3000);
  }, []);

  const checkAuth = () => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };
  return (
    <>
      <StatusBar backgroundColor={'#041234'} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#041234',
        }}>
        <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
          Assignment
        </Text>
      </View>
    </>
  );
};

export default SplashScreen;
