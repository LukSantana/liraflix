import { styled } from "styled-components";

export const InputContainer = styled.input`
  height: 2.5rem;
  width: 12rem;
  background-color: RGBA(0, 0, 0, 0.4);
  border: 1px solid #fff;
  border-radius: 8px;
  padding-left: 1rem;
  font-family: 'Inter', sans-serif;

  &:focus-within{
    border: 1px solid #e50914;
  }
`