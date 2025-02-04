import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { picturesSelector } from '../reducer';

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
  const pictures = useSelector(picturesSelector);
  return (
    <Container>
      {pictures.map(picture => (
        <Image key={picture.previewFormat} src={picture.previewFormat} alt={picture.author} />
      ))}
    </Container>
  );
};

export default Pictures;
