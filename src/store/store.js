import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage by default

import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartProduct'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'

// Create persist config
const persistConfig = {
  key: 'root',
  storage,
}

// Wrap the reducers you want to persist
const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedProductReducer = persistReducer(persistConfig, productReducer)
const persistedCartReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    product: persistedProductReducer,
    cartItem: persistedCartReducer,
    addresses: addressReducer, // You can persist this too if needed
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Create persistor
export const persistor = persistStore(store)
