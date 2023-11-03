import { useEffect } from "react";
import { Alert } from "@mui/material";
import { css } from "styled-components";

import { useAlertContext } from "@context/alertContext";

const AlertComponent = () => {
	const { alertInfo, setAlertInfo } = useAlertContext();

	const removeAlert = () => {
		setTimeout(() => {
			setAlertInfo();
		}, 6000);
	};

	useEffect(() => removeAlert, [alertInfo]);

	const alertFadeInAnimation = css`
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	`;

	if (!alertInfo?.message) return <></>;

	return (
		<Alert
			severity={alertInfo?.type}
			sx={{
				width: "40%",
				position: "absolute",
				zIndex: 1000,
				top: "90vh",
				left: 0,
				right: 0,
				marginLeft: "auto",
				marginRight: "auto",
				animation: `${alertFadeInAnimation} 1s ease-out`,
			}}
		>
			{alertInfo?.message}
		</Alert>
	);
};

export default AlertComponent;
