import { Alert } from "@mui/material";
import { useAlertContext } from "../../context/alertContext";
import { useEffect } from "react";
import { keyframes } from "styled-components";

const AlertComponent = () => {
	const { alertInfo, setAlertInfo } = useAlertContext();

	const removeAlert = () => {
		setTimeout(() => {
			setAlertInfo();
		}, 5000);
	};

	useEffect(() => removeAlert, [alertInfo]);

	const alertFadeInAnimation = keyframes`
	from {
    opacity: 0;
  }

  to {
    opacity: 1;
	}
	`;

	return alertInfo?.message ? (
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
	) : (
		<></>
	);
};

export default AlertComponent;
