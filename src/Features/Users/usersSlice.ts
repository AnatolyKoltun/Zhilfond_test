import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { State } from './state';

import * as api from '../../App/Api';

const initialState: State = {
  users: [],
  error: undefined,
};

export const loadUsers = createAsyncThunk('users/load', (req: string) =>
  api.fetchUsers(req)
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
