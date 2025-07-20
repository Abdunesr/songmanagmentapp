import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { createSongStart, updateSongStart } from "../features/songs/songsSlice";
import { useNavigate, useParams } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SongForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, songs } = useSelector((state) => state.songs);

  useEffect(() => {
    if (id) {
      const songToEdit = songs.find((song) => song.id === parseInt(id));
      if (songToEdit) {
        setFormData({
          title: songToEdit.title,
          artist: songToEdit.artist,
          album: songToEdit.album,
          year: songToEdit.year,
        });
      }
    }
  }, [id, songs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateSongStart({ id: parseInt(id), ...formData }));
    } else {
      dispatch(createSongStart(formData));
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Edit Song" : "Add New Song"}</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artist:</label>
          <Input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Album:</label>
          <Input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <Input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Song" : "Add Song"}
        </Button>
      </Form>
    </div>
  );
};

export default SongForm;
