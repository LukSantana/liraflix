import { APP_ROUTER_PREFIX, serverPort } from "../infra/environments";
import { getContent } from "./getContent";

const apiUrl = `http://localhost:${serverPort}${APP_ROUTER_PREFIX}`;

export const swaggerDocument = {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "LiraFlix",
		description:
			"Aplicação para controle de conteúdos assistidos e a assistir.",
		contact: {
			name: "Lucas Santana",
			email: "lucas.diassantana@gmail.com",
			url: "https://luksantana.com.br",
		},
		servers: [
			{
				url: apiUrl,
				description: 'Local server'
			},
		],
		paths: {
			"/content/list": {
				get: getContent,
			},
		},
	},
};
