import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { updateContentStatus } from "@api/liraflixApi";
import Button from "@components/Button";
import { useAlertContext } from "@context/alertContext";
import {
	possibleStatus,
	translateStatusNameToId,
} from "@utils/translateStatus";
import {
	InputWrapper,
	Label,
	Option,
	Overlay,
	Select,
	UpdateFormContainer,
	UpdateFormWrapper,
} from "./styles";
import translate from "translate";
import { ContentProps } from "@src/types/content";

interface UpdateFormProps {
	content: ContentProps
	contentId: string | number | undefined;
	oldContentStatus: string | undefined;
	setShowUpdateForm: any;
}

const UpdateForm = ({
	content,
	contentId,
	oldContentStatus,
	setShowUpdateForm,
}: UpdateFormProps) => {
	const [contentStatus, setContentStatus] = useState<string>("");
	const { setAlertInfo } = useAlertContext();

	const handleUpdate = async (event: any) => {
		event.preventDefault();

		console.log(content);

		if (!contentId) return;

		const translatedStatus = await translateStatusNameToId(contentStatus);

		const response = await updateContentStatus({
			content_id: contentId,
			content_status: translatedStatus,
		});

		if (response?.status === 200) {
			const portugueseStatus = await translate(contentStatus, { to: "pt" });

			content.content_status = response?.data.content_status;
			setAlertInfo({
				message: `O conteúdo ${response.data.name} teve seu status atualizado para ${portugueseStatus}.`,
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
