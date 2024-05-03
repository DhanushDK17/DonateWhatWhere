import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchEvents, deleteEvent, updateEvent } from '../../api/events';

const initialState = {
    events: {},
    status: "idle",
}

export const fetchEventsAction = createAsyncThunk("events/fetch", fetchEvents)
export const deleteEventAction = createAsyncThunk("events/delete", deleteEvent)
export const claimEventAction = createAsyncThunk("events/update", updateEvent)

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setDonations: (state,action) => {
      state.user = action.payload;
      return state;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchEventsAction.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(fetchEventsAction.fulfilled, (state, action) => {
        state.status = 'success'
        state.events = action.payload
    })
    .addCase(deleteEventAction.rejected, (state, action) => {
        state.status = "error"
    })
    .addCase(deleteEventAction.fulfilled, (state, action) => {
      if (!action?.payload.id) {
          return 
      }
      const { id } = action.payload;
      const oldDonations = state.donations.filter(post => 
      post.id !== id)
      state.donations = oldDonations
    })
  }
});

export const getEvents = (state) => state.event.events;
export const getEventsStatus = (state) => state.event.status;

export default eventsSlice.reducer;