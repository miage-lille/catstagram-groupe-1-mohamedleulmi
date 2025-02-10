import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import { Picture } from '../types/picture.type';
import ModalPortal from './modal';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;


const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);

  const handleSelectPicture = (picture: Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container>
      {pictures.map(picture => (
        <Image
          key={picture.previewFormat}
          src={picture.previewFormat}
          alt={picture.author}
          onClick={() => handleSelectPicture(picture)}
        />
      ))}
      {selectedPicture && (
        <ModalPortal largeFormat={selectedPicture.largeFormat} close={handleCloseModal} />
      )}
    </Container>
  );
};

export default Pictures;
