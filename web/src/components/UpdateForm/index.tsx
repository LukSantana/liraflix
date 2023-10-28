import { useState } from "react";
import { updateContentStatus } from "../../api/liraflixApi";
import OutsideClickHandler from "react-outside-click-handler";
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
import { useAlertContext } from "../../context/alertContext";
import { possibleStatus } from "../../utils/translateStatus";

const UpdateForm = ({ contentId, oldContentStatus, setShowUpdateForm }) => {
	const [contentStatus, setContentStatus] = useState<string>("");
	const { setAlertInfo } = useAlertContext();

	const handleUpdate = async (event) => {
		event.preventDefault();

		const response = await updateContentStatus(contentId, contentStatus);
		if (response?.status === 200) {
			setAlertInfo({
				message: `O conteúdo ${response.data.name} teve seu status atualizado para ${contentStatus}.`,
				type: "success",
			});
		} else {
			setAlertInfo({
				message: `Não foi possível atualizar o status do conteúdo.`,
				type: "error",
			});
		}

		setShowUpdateForm(false);
	};

	return (
		<>
			<Overlay>
				<OutsideClickHandler onOutsideClick={() => setShowUpdateForm(false)}>
					<UpdateFormContainer>
						<UpdateFormWrapper>
							<InputWrapper>
								<Label>Status:</Label>
								<Select
									defaultValue={oldContentStatus}
									onChange={(e) => setContentStatus(e.target.value)}
								>
									{possibleStatus.map((status) => (
										<Option value={status.status} key={status.id}>
											{status.translation}
										</Option>
									))}
								</Select>
							</InputWrapper>
							<Button onClick={handleUpdate}>Atualizar</Button>
						</UpdateFormWrapper>
					</UpdateFormContainer>
				</OutsideClickHandler>
			</Overlay>
		</>
	);
};

export default UpdateForm;
