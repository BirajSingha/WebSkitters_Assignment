import {combineReducers} from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {storage} from 'redux-persist/lib/storage';
import {version} from 'react';
import authSlice from './slice/auth-slice';
import userSlice from './slice/user-slice';
import productSlice from './slice/product-slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['errorMessage', 'error'],
};

const authConfig = {
  key: 'auth',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['errorMessage', 'error'],
};

const userConfig = {
  key: 'user',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['errorMessage', 'error'],
};

const productConfig = {
  key: 'products',
  version: 1,
  storage: AsyncStorage,
  keyPrefix: '',
  blacklist: ['errorMessage', 'error'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authSlice),
  user: persistReducer(userConfig, userSlice),
  products: persistReducer(productConfig, productSlice),
});

export default persistReducer(persistConfig, rootReducer);
