import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: {},
    accessToken: {},
    loadMainPage: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo: (state,action) => {
      state.user = action.payload;
      return state;
    },
    resetUserData : (state) => {
      state = {...initialState};
      return state;
    }

  },
});

export const getUser = (state) => state.user.user;

export const {setUserInfo,refreshAccessToken,resetUserData} = userSlice.actions;
export default userSlice.reducer;