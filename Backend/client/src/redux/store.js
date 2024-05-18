import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice';
//userreducer is the userSlice.reducer we exported from userSlice



//inplace of adding all the reducers we just added the persistedReducer
export const store=configureStore({
    reducer:{user:userReducer},
    //the middleware is needed to prevent the error using redux toolkit
    //the serializable check is used to prevent any error in the browser
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({ serializableCheck:false}),
  });
  
  
