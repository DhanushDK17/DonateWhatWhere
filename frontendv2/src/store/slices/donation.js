import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { claimDonation, deleteDonation, fetchDonations } from '../../api/donations';


const initialState = {
    donations: {},
    status: "idle",
    message: ""
}

export const fetchDonationsAction = createAsyncThunk("donations/fetch", fetchDonations)
export const deleteDonationAction = createAsyncThunk("donations/delete", deleteDonation)
export const claimDonationAction = createAsyncThunk("donations/claim", claimDonation)

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonations: (state,action) => {
      state.user = action.payload;
      return state;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchDonationsAction.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(fetchDonationsAction.fulfilled, (state, action) => {
        state.status = 'success'
        state.donations = action.payload
    })
    .addCase(fetchDonationsAction.rejected, (state, action) => {
        state.status = "error"
        state.message = action.error.message
    })
    .addCase(deleteDonationAction.fulfilled, (state, action) => {
      if (!action?.payload.id) {
          console.log("could not delete");
          console.log(action.payload)
          return 
      }
      const { id } = action.payload;
      const oldDonations = state.donations.filter(post => 
      post.id !== id)
      state.donations = oldDonations
    })
  }
});

export const getDonations = (state) => state.donation.donations;
export const getDonationsStatus = (state) => state.donation.status;
export const getDonationsMessage = (state) => state.donation.message;

export default donationSlice.reducer;