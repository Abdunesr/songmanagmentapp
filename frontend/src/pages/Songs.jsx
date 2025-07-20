import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSongsStart } from "../features/songs/songsSlice";
import SongList from "../components/SongList";

const Songs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsStart({ page: 1 }));
  }, [dispatch]);

  return (
    <div>
      <h1>Songs</h1>
      <SongList />
    </div>
  );
};

export default Songs;
