import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAuth0 } from "@auth0/auth0-react";
const init = {
  userInfo: {}
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: init,
    reducers: {
        updateInfo: (state, action) => {
          state.userInfo = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //    builder.addCase(fetUser.fulfilled, (state, action) => {
    //     state.userInfo = action.payload
    //    })
    // }
});

// export const fetUser = createAsyncThunk("profile/fetchUser", async () => {
//     // const {user} = useAuth0();

//     // return user;
// });

export const profileSelector = (state) => state.profile.userInfo;

export const {updateInfo} = profileSlice.actions;

export default profileSlice.reducer;