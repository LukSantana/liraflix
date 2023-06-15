import { Alert } from "@mui/material";
import { useAlertContext } from "../../context/alertContext";

const AlertComponent = () => {
	const { alertInfo } = useAlertContext();
	return alertInfo?.message ? (
		<Alert
			severity={alertInfo?.type}
			sx={{
				width: '40%',
				position: "absolute",
				zIndex: 1000,
				top: "90vh",
				left: 0,
				right: 0,
				marginLeft: "auto",
				marginRight: "auto",
				transition: "all 0.2s ease-out",
			}}
		>
			{alertInfo?.message}
		</Alert>
	) : (
		<></>
	);
};

export default AlertComponent;
