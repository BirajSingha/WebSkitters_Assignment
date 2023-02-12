import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
const initialState = {
  loading: false,
  isLoggedIn: false,
  error: false,
  errorMessage: '',
  product: {},
  products: [],
};

export const addProduct = createAsyncThunk(
  'add-product',
  async (body, {rejectwithValue}) => {
    const data = await firestore().collection('products').add(body);

    console.log(data);
  },
);

export const fetchProducts = createAsyncThunk(
  'fetch-product',
  async (body, {rejectwithValue}) => {
    const products = [];
    const productRef = firestore().collection('products');
    const snapshot = await productRef.where('user_id', '==', body).get();

    snapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      products.push(data);
    });

    return products;
  },
);

export const editProducts = createAsyncThunk(
  'edit-products',
  async (body, {rejectwithValue}) => {
    const {id, name, price, offerPrice, image_url} = body;
    const user_id = body.uid;
    const productRef = firestore().collection('products');
    const snapshot = await productRef
      .doc(id)
      .set({user_id, name, offerPrice, price, image_url});
    console.log(snapshot);
  },
);

export const deleteProduct = createAsyncThunk(
  'delete-prodcuts',
  async (body, {rejectwithValue}) => {
    const productRef = firestore().collection('products');
    const snapshot = await productRef.doc(body).delete();
    console.log(snapshot);
  },
);

const productSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {},
  extraReducers: {
    [addProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [editProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [editProducts.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [editProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
