import styled from "styled-components";
import themes from "../../themes";

export const RandomMoviePickerExternalContainer = styled.div`
	display: flex;
  justify-content: center;
  align-items: center;
	width: 50%;
`;

export const RandomMoviePickerInternalContainer = styled.div`
  display: flex;
  padding: 2rem;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
	background: #333333;
	width: 80%;
  border-radius: 16px;
`;

export const Title = styled.h1`
  font-family: 'MontSerrat', 'Inter', sans-serif;
  font-weight: bold;
  font-size: 28px;
`
export const Button = styled.button`
  background: none;
  border: 1px solid ${themes.colors.red};
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: bold;
  font-family: 'MontSerrat', sans-serif;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  
  &:hover{
    transform: translateY(-3px);
  }
`;

export const Icon = styled.img`
  width: 4rem;
`
