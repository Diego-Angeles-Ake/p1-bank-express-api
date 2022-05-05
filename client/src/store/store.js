import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import transfersReducer from './slices/transfers.slice';
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    transfers: transfersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
