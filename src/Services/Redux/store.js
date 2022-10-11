import {configureStore} from '@reduxjs/toolkit';
import searchSlice from '../../Layouts/Headers/searchSlice';

const rootReducer = {
    reducer: {
        search: searchSlice
    }
}

const store = configureStore(rootReducer);

export default store;