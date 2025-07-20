import axios from "axios";

export const fetchSongs = (page = 1) => {
  return axios.get(`${process.env.API_BASE_URL}/songs?page=${page}`);
};

export const createSong = (songData) => {
  return axios.post(`${process.env.API_BASE_URL}/songs`, songData);
};

export const updateSong = (id, songData) => {
  return axios.put(`${process.env.API_BASE_URL}/songs/${id}`, songData);
};

export const deleteSong = (id) => {
  return axios.delete(`${process.env.API_BASE_URL}/songs/${id}`);
};
