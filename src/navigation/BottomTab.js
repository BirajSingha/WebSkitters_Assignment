import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Products from '../screens/Products/Products';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 20,
          paddingBottom: 7,
          height: 60,
          borderRadius: 10,
          backgroundColor: '#041234',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color="white"
              style={{marginBottom: -10}}
            />
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: () => (
            <FontAwesomeIcon
              name="shopping-cart"
              size={24}
              color="white"
              style={{marginBottom: -10}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: () => (
            <FontAwesomeIcon
              name="user"
              size={24}
              color="white"
              style={{marginBottom: -10}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
