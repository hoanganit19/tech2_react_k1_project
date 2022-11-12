import {configureStore} from '@reduxjs/toolkit';
import searchSlice from '../../Layouts/Headers/searchSlice';
import playerSlice from '../../Components/Player/playerSlice';
import profileSlice from '../../Layouts/Headers/profileSlice';

const rootReducer = {
    reducer: {
        search: searchSlice,
        player: playerSlice,
        profile: profileSlice
    }
}

const store = configureStore(rootReducer);

export default store;