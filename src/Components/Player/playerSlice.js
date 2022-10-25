import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const init = {
    isPlay: false
}

const playerSlice = createSlice({
    name: 'player',
    initialState: init,
    reducers: {
        doPlay: (state, action) => {   
            state.isPlay = action.payload;
        }
    },
    extraReducers: {
        
    }
});

export const playerSelector = (state) => state.player.isPlay;

export const playerListenerSelector = (state) => state.player.playerListener;

export const {doPlay, doPlayerListener} = playerSlice.actions;

export default playerSlice.reducer;