import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../../components/screen/Home';

export const getAdminAvatar = createAsyncThunk(
  'admin/getAdminAvatar',
  async (thunkAPI) => {
    try {
      const res = await server.get('/avatarImg');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoading: false,
  devAvatar: null,
  error: null,
};

const fetchSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 로딩 중
      .addCase(getAdminAvatar.pending, (state, action) => {
        state.isLoading = true;
      })
      //   비동기 작업 완료
      .addCase(getAdminAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.devAvatar = action.payload;
      })
      //   비동기 작업 실패
      .addCase(getAdminAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default fetchSlice.reducer;
