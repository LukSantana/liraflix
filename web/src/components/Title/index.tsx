import { TitleComponent } from "./styles";

interface TitleProps {
	children: string | JSX.Element;
}

const Title = ({ children }: TitleProps) => {
	return <TitleComponent>{children}</TitleComponent>;
};

export default Title;
