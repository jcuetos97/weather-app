import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import errorSlice from './errors';
import weatherSlice from './weather';
import userSlice from './user';

// Combine all reducers
const rootReducer = combineReducers({
  errors: errorSlice,
  user: userSlice,
  weather: weatherSlice,
});

// Configure the persistence for the root reducer
const persistConfig = {
  key: 'root', // This is the key under which your state will be saved in the storage
  storage, // This determines which storage to use, like localStorage or AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor, rootReducer };
