import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const genresRouter = Router();

const prisma = new PrismaClient();

genresRouter.get("/genres", async (req: Request, res: Response) => {
	try {
		let genreName = req.query.name;
		let contentType = req.query.type;

		let whereProps: {
			name: any;
			content_type: any;
		} = {
			name: genreName,
			content_type: contentType,
		};

		let response;

		response = await prisma.genres.findMany({
			where: whereProps,
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

genresRouter.get("/genres/:id", async (req: Request, res: Response) => {
	try {
		let genreId = req.params.id;
		let response;

		response = await prisma.genres.findUnique({
			where: {
        id: genreId,
      },
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

genresRouter.get("/genres/:names", async (req: Request, res: Response) => {
	try {
		let genreNames = req.params.names;
		let response;

		response = await prisma.genres.findMany({
			where: {
        name: genreNames
      },
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

export default genresRouter;
