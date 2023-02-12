import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../../store/slice/auth-slice';
import {useNavigation} from '@react-navigation/native';
import LoginImage from '../../assets/loginBG.png';

const {width, height} = Dimensions.get('window');

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [icon, setIcon] = useState('eye');
  const [secureText, setSecureText] = useState(true);

  const {loading} = useSelector(state => state.auth);

  const navigation = useNavigation();

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

  const handleRegister = () => {
    if (name == '') {
      alert('Please enter name');
    } else if (email == '') {
      alert('Please ente email');
    } else if (password == '') {
      alert('Please ente password');
    } else {
      dispatch(signUp({username: name, email, password}))
        .unwrap()
        .then(() => {
          navigation.navigate('Login');
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
        label={'Username'}
        placeholder="Enter Your Username"
        placeholderTextColor="gray"
        mode="outlined"
        outlineColor="gray"
        activeOutlineColor="#041234"
        outlineStyle={{
          borderColor: '#041234',
        }}
        contentStyle={{color: 'black'}}
        style={{width: '70%', marginBottom: 10, fontSize: width * 0.04}}
        onChangeText={val => {
          setName(val);
        }}
        value={name}
      />

      <TextInput
        label={'Email'}
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
        style={{width: '70%', fontSize: width * 0.04}}
        onChangeText={pwd => setPassword(pwd)}
        value={password}
      />

      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.registerButton}>
        {loading == true ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{color: '#fff', fontSize: width * 0.04}}>Register</Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{color: 'black', fontSize: width * 0.04}}>
          Already have an account?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: '#041234',
              marginLeft: 5,
              fontWeight: 'bold',
              fontSize: width * 0.04,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerButton: {
    width: '50%',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#041234',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  ImageStyle: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
});
