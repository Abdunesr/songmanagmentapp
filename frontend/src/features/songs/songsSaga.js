import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "./songsSlice";

function* fetchSongs(action) {
  try {
    const { page } = action.payload;
    const response = yield call(
      axios.get,
      `${process.env.API_BASE_URL}/songs?page=${page}`
    );
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSong(action) {
  try {
    const response = yield call(
      axios.post,
      `${process.env.API_BASE_URL}/songs`,
      action.payload
    );
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSong(action) {
  try {
    const { id, ...songData } = action.payload;
    const response = yield call(
      axios.put,
      `${process.env.API_BASE_URL}/songs/${id}`,
      songData
    );
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(
      axios.delete,
      `${process.env.API_BASE_URL}/songs/${action.payload}`
    );
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongs);
  yield takeLatest(createSongStart.type, createSong);
  yield takeLatest(updateSongStart.type, updateSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
}
