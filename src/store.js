import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import regisUserReducer from './slices/regisUserSlice';
import tictketsReducer from './slices/ticketsSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        regisUser: regisUserReducer,
        tictket: tictketsReducer,
    }
})

export default store;