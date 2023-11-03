import React, { MouseEventHandler } from "react";
import { ButtonWrapper } from "./styles";

interface ButtonProps {
	children: string | JSX.Element;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }: ButtonProps) => {
	return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
};

export default Button;
