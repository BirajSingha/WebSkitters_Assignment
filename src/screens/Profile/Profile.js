import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authStateClear} from '../../store/slice/auth-slice';
import {userStateClear} from '../../store/slice/user-slice';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const logout = () => {
    dispatch(authStateClear());
    dispatch(userStateClear());
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000',
          marginBottom: 10,
          fontWeight: '500',
          fontSize: width * 0.06,
        }}>
        Hello {user?.username}
      </Text>

      <Text
        style={{
          color: '#000',
          marginBottom: 20,
          fontWeight: '500',
          fontSize: width * 0.05,
        }}>
        Welcome to WebSkitters!
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => logout()}>
        <Text
          style={{color: '#fff', fontSize: width * 0.04, textAlign: 'center'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    width: '50%',
    backgroundColor: '#041234',
    paddingVertical: 10,
    borderRadius: 10,
  },
});
