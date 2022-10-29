import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const init = {
   // isPlay: false,
    isOpenPlayer: false,
    playInfo: {
        isPlay: false, //Trạng thái phát nhạc
        info: {} //Thông tin bài hát: tên bài, ca sĩ, file mp3
    }
}

const playerSlice = createSlice({
    name: 'player',
    initialState: init,
    reducers: {
        doPlay: (state, action) => {   
            //state.isPlay = action.payload;
            state.playInfo = action.payload;
        },

        doOpenPlayer: (state, action) => {
            state.isOpenPlayer = action.payload
        }
    },
    extraReducers: {
        
    }
});

export const playerSelector = (state) => state.player.playInfo;

export const openPlayerSelector = (state) => state.player.isOpenPlayer;

export const {doPlay, doOpenPlayer} = playerSlice.actions;

export default playerSlice.reducer;