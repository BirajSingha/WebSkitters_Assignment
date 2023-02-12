import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: false,
  errorMessage: '',
  uid: '',
};

export const signUp = createAsyncThunk(
  'signup',
  async (body, {rejectWithValue}) => {
    const {username, email, password} = body;

    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      const user = {
        username: username,
        email: email,
        user_id: res.user.uid,
      };
      const data = await firestore()
        .collection('users')
        .doc(res.user.uid)
        .set(user);
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const signIn = createAsyncThunk(
  'signin',
  async (body, {rejectWithValue}) => {
    const {email, password} = body;
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      return res.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'user-auth',
  initialState,
  reducers: {
    authStateClear: () => initialState,
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [signUp.rejected]: (state, action) => {},

    [signIn.pending]: (state, action) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.uid = action.payload.uid;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.errorMessage = 'Email or password is wrong';
    },
  },
});
export const {authStateClear} = authSlice.actions;

export default authSlice.reducer;
