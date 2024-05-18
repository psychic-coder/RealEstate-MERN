import { configureStore,combineReducers  } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
//in the above line we are importing the userSlice.reducer

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer=combineReducers({
    user:userReducer,
})

const persistConfig={
    key:'root',//name of the key is "root" in the local storage
    storage,
    version:1,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);



//inplace of adding all the reducers we just added the persistedReducer
export const store=configureStore({
    reducer:persistedReducer,
    //the middleware is needed to prevent the error using redux toolkit
    //the serializable check is used to prevent any error in the browser
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({ serializableCheck:false}),
  });

  export const persistor=persistStore(store);
  
  
