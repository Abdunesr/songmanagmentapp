import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongStart, fetchSongsStart } from "../features/songs/songsSlice";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiMusic,
  FiUser,
  FiDisc,
  FiCalendar,
} from "react-icons/fi";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TitleIcon = styled.div`
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
    background: linear-gradient(45deg, #7c3aed, #db2777);
  }
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
`;

const Th = styled.th`
  padding: 1.25rem 1.5rem;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:first-of-type {
    padding-left: 2rem;
  }
`;

const Td = styled.td`
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
  color: #1e293b;
  font-size: 0.95rem;

  &:first-of-type {
    padding-left: 2rem;
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SongCover = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(45deg, #e2e8f0, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SongTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  transition: color 0.3s ease;

  &:hover {
    color: #4f46e5;
  }
`;

const ActionCell = styled(Td)`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background: ${(props) =>
    props.variant === "edit"
      ? "linear-gradient(45deg, #4f46e5, #7c3aed)"
      : "linear-gradient(45deg, #ef4444, #dc2626)"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    background: ${(props) =>
      props.variant === "edit"
        ? "linear-gradient(45deg, #4338ca, #6d28d9)"
        : "linear-gradient(45deg, #dc2626, #b91c1c)"};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;

const PageInfo = styled.div`
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  min-width: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(45deg, #8b5cf6, #ec4899)"
      : "rgba(255, 255, 255, 0.95)"};
  color: ${(props) => (props.active ? "white" : "#1e293b")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: ${(props) => !props.active && "rgba(243, 244, 246, 0.95)"};
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  padding: 3rem;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(239, 68, 68, 0.9);
  border-radius: 12px;
  margin: 1rem 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, totalPages, totalSongs } =
    useSelector((state) => state.songs);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongStart(id));
    }
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch(fetchSongsStart({ page }));
    }
  };

  if (loading)
    return (
      <Container>
        <LoadingMessage>
          <LoadingSpinner />
          Loading your music library...
        </LoadingMessage>
      </Container>
    );

  if (error)
    return (
      <Container>
        <ErrorMessage>Error loading songs: {error}</ErrorMessage>
      </Container>
    );

  return (
    <Container>
      <Header>
        <TitleContainer>
          <TitleIcon>
            <FiMusic />
          </TitleIcon>
          <Title>Music Library</Title>
        </TitleContainer>
        <HeaderActions>
          <AddButton to="/add">
            <FiPlus size={20} />
            Add Song
          </AddButton>
        </HeaderActions>
      </Header>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>Album</Th>
              <Th>Year</Th>
              <Th>Actions</Th>
            </tr>
          </TableHeader>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <Td>
                  <SongInfo>
                    <SongCover>
                      <FiMusic size={20} />
                    </SongCover>
                    <SongTitle>{song.title}</SongTitle>
                  </SongInfo>
                </Td>
                <Td>
                  <SongInfo>
                    <FiUser size={20} color="#64748b" />
                    {song.artist}
                  </SongInfo>
                </Td>
                <Td>
                  <SongInfo>
                    <FiDisc size={20} color="#64748b" />
                    {song.album || "-"}
                  </SongInfo>
                </Td>
                <Td>
                  <SongInfo>
                    <FiCalendar size={20} color="#64748b" />
                    {song.year}
                  </SongInfo>
                </Td>
                <ActionCell>
                  <Link to={`/edit/${song.id}`}>
                    <ActionButton variant="edit" title="Edit">
                      <FiEdit size={18} />
                    </ActionButton>
                  </Link>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleDelete(song.id)}
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </ActionButton>
                </ActionCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <PageInfo>
            Showing {songs.length} of {totalSongs} songs
          </PageInfo>
          <PageButtons>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft size={20} />
            </PageButton>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <PageButton
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  active={pageNum === currentPage}
                >
                  {pageNum}
                </PageButton>
              );
            })}

            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight size={20} />
            </PageButton>
          </PageButtons>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default SongList;
