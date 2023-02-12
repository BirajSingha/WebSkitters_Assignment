import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import React from 'react';
import LoginImage from '../../assets/loginBG.png';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../store/slice/auth-slice';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [icon, setIcon] = useState('eye');
  const [secureText, setSecureText] = useState(true);

  const {errorMessage} = useSelector(state => state.auth);

  const {loading} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const toggleIcon = () => {
    if (icon === 'eye') {
      setIcon('eye-off');
      setSecureText(false);
    } else {
      setIcon('eye');
      setSecureText(true);
    }
  };

  const handleLogin = () => {
    if (email == '') {
      alert('Please enter email');
    } else if (password == '') {
      alert('please enter password');
    } else {
      dispatch(signIn({email, password}))
        .unwrap()
        .then(() => {
          navigation.replace('BottomTab');
        })
        .catch(e => {
          alert(errorMessage);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#041234'} barStyle="light-content" />

      <Image
        source={LoginImage}
        resizeMode="contain"
        style={styles.ImageStyle}
      />

      <TextInput
        placeholder="Enter Your Email"
        placeholderTextColor="gray"
        mode="outlined"
        outlineColor="gray"
        activeOutlineColor="#041234"
        outlineStyle={{
          borderColor: '#041234',
        }}
        contentStyle={{color: 'black'}}
        style={{width: '70%', marginBottom: 10, fontSize: width * 0.04}}
        label={'Email'}
        onChangeText={val => {
          setEmail(val);
        }}
        value={email}
      />

      <TextInput
        mode="outlined"
        label="Password"
        outlineColor="gray"
        activeOutlineColor="#041234"
        placeholder="Enter Your Password"
        placeholderTextColor="gray"
        right={<TextInput.Icon icon={icon} onPress={toggleIcon} />}
        outlineStyle={{
          borderColor: '#041234',
        }}
        contentStyle={{color: 'black'}}
        secureTextEntry={secureText}
        style={{width: '70%', marginBottom: 10, fontSize: width * 0.04}}
        onChangeText={pwd => setPassword(pwd)}
        value={password}
      />

      <TouchableOpacity
        onPress={() => handleLogin()}
        style={styles.registerButton}>
        {loading === true ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              color: 'white',
              fontSize: width * 0.04,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerLinkContainer}>
        <Text style={{color: 'black'}}>Dont have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginLeft: 5}}>
          <Text style={{color: '#041234', fontWeight: 'bold'}}>
            Register here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ImageStyle: {
    width: 300,
    height: 300,
  },

  registerLinkContainer: {
    flexDirection: 'row',
  },

  registerButton: {
    width: '50%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#041234',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
