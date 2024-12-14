import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slice/todoSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer once
const persistedReducer = persistReducer(persistConfig, todoSlice);

// Configure store with optimized middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      // Enable serializable check with ignored actions for redux-persist
      serializableCheck: process.env.NODE_ENV === 'development' ? {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      } : false,
      // Enable immutability checks only in development
      immutableCheck: process.env.NODE_ENV === 'development',
    }),
  // Enable devTools only in development
  devTools: process.env.NODE_ENV === 'development'
});

// Create persistor
export const persistor = persistStore(store);
export default store;
