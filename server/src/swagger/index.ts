import { APP_ROUTER_PREFIX, serverPort } from "../infra/environments";
import { getContent } from "./getContent";
export const swaggerDocument = {
	openapi: "3.0.1",
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
		schemes: ["http"],
		servers: [
			{
				url: "http://localhost:3333",
			},
		],
		host: `http://localhost:${serverPort}`,
		basePath: APP_ROUTER_PREFIX,
		paths: {
			'/content': {
				get: getContent,
			},
		},
	},
};
