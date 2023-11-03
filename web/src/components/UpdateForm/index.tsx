import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { updateContentStatus } from "@api/liraflixApi";
import Button from "@components/Button";
import { useAlertContext } from "@context/alertContext";
import { possibleStatus } from "@utils/translateStatus";
import {
	InputWrapper,
	Label,
	Option,
	Overlay,
	Select,
	UpdateFormContainer,
	UpdateFormWrapper,
} from "./styles";

interface UpdateFormProps {
	contentId: string | number;
	oldContentStatus: string;
	setShowUpdateForm: (showUpdateForm: boolean) => void;
}

const UpdateForm = ({
	contentId,
	oldContentStatus,
	setShowUpdateForm,
}: UpdateFormProps) => {
	const [contentStatus, setContentStatus] = useState<string>("");
	const { setAlertInfo } = useAlertContext();

	const handleUpdate = async (event: any) => {
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
							<Button onClick={(event: any) => handleUpdate(event)}>
								Atualizar
							</Button>
						</UpdateFormWrapper>
					</UpdateFormContainer>
				</OutsideClickHandler>
			</Overlay>
		</>
	);
};

export default UpdateForm;
