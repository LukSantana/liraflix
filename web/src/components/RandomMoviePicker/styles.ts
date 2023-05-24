import styled from "styled-components";

export const RandomMoviePickerExternalContainer = styled.div`
	display: flex;
  justify-content: center;
  align-items: center;
	width: 100%;
	height: 30vh;
`;

export const RandomMoviePickerInternalContainer = styled.div`
  display: flex;
  padding: 2rem;
  gap: 3rem;
  flex-direction: column;
  align-items: center;
	background: #333333;
	width: 80%;
	height: 80%;
  border-radius: 16px;
`;

export const Title = styled.h1`
  font-family: 'MontSerrat', 'Inter', sans-serif;
  font-weight: bold;
  font-size: 28px;
`
export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  
  &:hover{
    scale: 1.1
  }
`

export const Icon = styled.img`
  width: 4rem;
`
