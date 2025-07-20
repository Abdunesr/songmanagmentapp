import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { createSongStart, updateSongStart } from "../features/songs/songsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 2rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("https://img.freepik.com/premium-photo/glowing-earbuds-dark-background_1302-50645.jpg")
      center/cover no-repeat;
    opacity: 0.15;
    z-index: 0;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 600px;
  height: 400px;
  background: url("https://img.freepik.com/premium-photo/glowing-earbuds-dark-background_1302-50645.jpg")
    center/cover no-repeat;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-right: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #7c3aed, #db2777);
  }
`;

const FormTitle = styled.h2`
  color: #1e293b;
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(229, 231, 235, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #7c3aed, #db2777);
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ImageContainer />
      <FormContainer>
        <FormHeader>
          <BackButton onClick={handleBack}>
            <FiArrowLeft size={20} />
            Back
          </BackButton>
          <FormTitle>{id ? "Edit Song" : "Add New Song"}</FormTitle>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="artist">Artist</Label>
            <Input
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="album">Album</Label>
            <Input
              type="text"
              id="album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="year">Year</Label>
            <Input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter release year"
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingIndicator />
                Saving...
              </>
            ) : (
              <>
                <FiSave size={20} />
                {id ? "Update Song" : "Add Song"}
              </>
            )}
          </SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default SongForm;
