import { useState } from "react";
import { updateContentStatus } from "../../api/liraflixApi";
import Button from "../Button";
import {
	InputWrapper,
	Label,
	Option,
	Overlay,
	Select,
	UpdateFormContainer,
	UpdateFormWrapper,
} from "./styles";

const UpdateForm = ({ contentId }) => {
	const [contentStatus, setContentStatus] = useState<string>("Plan to Watch");

  const handleUpdate = (event) => {
		event.preventDefault();

		updateContentStatus(contentId, contentStatus);
	};

	return (
		<>
			<Overlay>
				<UpdateFormContainer>
					<UpdateFormWrapper>
						<InputWrapper>
							<Label>Status:</Label>
							<Select
								defaultValue="Plan to Watch"
								onChange={(e) => setContentStatus(e.target.value)}
							>
								<Option value="Plan to Watch">Planeja Assistir</Option>
								<Option value="Watching">Assistindo</Option>
								<Option value="Dropped">Droppado</Option>
								<Option value="Completed">Assistido</Option>
								<Option value="On Wait">Em espera</Option>
							</Select>
						</InputWrapper>
						<Button onClick={handleUpdate}>Atualizar</Button>
					</UpdateFormWrapper>
				</UpdateFormContainer>
			</Overlay>
		</>
	);
};

export default UpdateForm;
