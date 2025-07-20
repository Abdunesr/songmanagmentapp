import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart(state, action) {
      state.loading = true;
      state.error = null;
      state.currentPage = action.payload.page;
    },
    fetchSongsSuccess(state, action) {
      state.songs = action.payload.data;
      state.totalPages = action.payload.last_page;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess(state, action) {
      state.songs = [action.payload, ...state.songs];
      state.loading = false;
    },
    createSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action) {
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
