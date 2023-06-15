import { ButtonWrapper } from "./styles";

const Button = ({ children, onClick }) => {
	return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
};

export default Button;
