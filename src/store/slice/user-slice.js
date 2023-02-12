import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: false,
  errorMessage: '',
  user: {},
};

export const fetchUser = createAsyncThunk(
  'user-data',
  async (body, {rejectWithValue}) => {
    const userRef = firestore().collection('users');
    console.log(body);
    const snapshot = await userRef.where('user_id', '==', body).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    } else {
      return snapshot._docs[0]._data;
    }
  },
);
const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {
    userStateClear: () => initialState,
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = 'Something went wrong';
    },
  },
});

export const {userStateClear} = userSlice.actions;
export default userSlice.reducer;
