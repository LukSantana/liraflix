import { InputContainer } from "./styles";

const TextInput = ({ id, onChange }) => {
	return <InputContainer id={id} onChange={onChange} type="text" />;
};

export default TextInput;
