import { createContext, useContext, useState } from "react";

export interface AlertContextContent {
	alertInfo: {
		message: string;
		type: any;
	} | undefined;
	setAlertInfo: any;
}

export const AlertContext = createContext<AlertContextContent>(
	{} as AlertContextContent
);

export const AlertContextProvider = ({ children }) => {
	const [alertInfo, setAlertInfo] = useState<{
		message: string;
		type: any;
	}>({
		message: "",
		type: "",
	});
	return (
		<AlertContext.Provider
			value={{
				alertInfo,
				setAlertInfo,
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};

export const useAlertContext = () => useContext(AlertContext);
