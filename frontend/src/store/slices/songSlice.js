import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    // Add other CRUD reducers...
  },
});

export const { fetchSongsStart, fetchSongsSuccess, fetchSongsFailure } =
  songSlice.actions;

export default songSlice.reducer;
