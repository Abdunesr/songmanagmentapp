import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchSongsSuccess, fetchSongsFailure } from "../slices/songSlice";

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, `${process.env.API_BASE_URL}/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeLatest("songs/fetchSongsStart", fetchSongsSaga);
}
