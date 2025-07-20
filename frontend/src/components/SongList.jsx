import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongStart, fetchSongsStart } from "../features/songs/songsSlice";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) =>
    props.danger ? "#e74c3c" : props.secondary ? "#2ecc71" : "#3498db"};
  color: white;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.songs
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongStart(id));
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchSongsStart({ page }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Song List</h2>
      <Link to="/add">
        <Button>Add New Song</Button>
      </Link>
      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Artist</Th>
            <Th>Album</Th>
            <Th>Year</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <Td>{song.title}</Td>
              <Td>{song.artist}</Td>
              <Td>{song.album}</Td>
              <Td>{song.year}</Td>
              <Td>
                <Link to={`/edit/${song.id}`}>
                  <Button secondary>Edit</Button>
                </Link>
                <Button danger onClick={() => handleDelete(song.id)}>
                  Delete
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SongList;
