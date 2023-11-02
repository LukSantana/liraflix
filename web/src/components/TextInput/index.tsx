import { InputContainer } from "./styles";

interface TextInput {
	id: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ id, onChange }) => {
	return <InputContainer id={id} onChange={onChange} type="text" />;
};

export default TextInput;
