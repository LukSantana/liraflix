import { ButtonWrapper } from "./styles";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
	children: string | JSX.Element;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }: ButtonProps) => {
	return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
};

export default Button;
