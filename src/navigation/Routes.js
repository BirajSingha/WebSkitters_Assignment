import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Splash/SplashScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import BottomTab from './BottomTab';
import AddProduct from '../screens/AddProduct/AddProduct';
import ViewProduct from '../screens/ViewProduct/ViewProduct';
import EditProduct from '../screens/EditProduct/EditProduct';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerTitle: 'Add Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#041234',
            },
          }}
        />
        <Stack.Screen
          name="ViewProduct"
          component={ViewProduct}
          options={{
            headerTitle: 'View Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#041234',
            },
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerTitle: 'Edit Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#041234',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
