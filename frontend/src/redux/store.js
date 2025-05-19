import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Lưu vào localStorage

import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // chỉ persist reducer 'auth'
};

const rootReducer = combineReducers({
    auth: authReducer,
    // ...add reducers khác nếu có
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    // ...existing code...
});

export const persistor = persistStore(store);
export default store;