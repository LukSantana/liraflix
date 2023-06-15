import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";

const contentRouter = Router();

const prisma = new PrismaClient();

contentRouter.get("/content/list", async (req: Request, res: Response) => {
	try {
		let contentId = req.query.id;
		let contentName = req.query.name;
		let contentStatus = req.query.status;
		let contentType = req.query.type;

		let whereProps: {
			id: any;
			name: any;
			content_status: any;
			content_type: any;
		} = {
			id: contentId,
			name: contentName,
			content_status: contentStatus,
			content_type: contentType,
		};

		let response;

		response = await prisma.contentList.findMany({
			where: whereProps,
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

contentRouter.post("/content", async (req: Request, res: Response) => {
	try {
		const body = req.body;

		const contentName = body.name;

		const contentStatusResponse = await prisma.contentStatus.findFirst({
			where: {
				status: body.content_status,
			},
		});
		const contentStatus = contentStatusResponse?.id;

		const contentTypeResponse = await prisma.contentType.findFirst({
			where: {
				name: body.content_type,
			},
		});
		const contentType = contentTypeResponse?.id;

		const globalRating = body.global_rating;
		const personalRating = body.personal_rating;
		const genres = body.genres;
		const images = body.images;

		const queryData: {
			id: any;
			name: any;
			content_status: any;
			content_type: any;
			global_rating: any;
			personal_rating: any;
			genres: any;
			images: any;
		} = {
			id: randomUUID(),
			name: contentName,
			content_status: contentStatus,
			content_type: contentType,
			global_rating: globalRating,
			personal_rating: personalRating && personalRating,
			genres: `[${genres.join(',')}]`,
			images: images,
		};

		const response = await prisma.contentList.create({
			data: queryData,
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e);
	}
});

contentRouter.get("/content/id/:id", async (req: Request, res: Response) => {
	try {
		const contentId = req.params.id;

		const response = await prisma.contentList.findFirst({
			where: {
				id: contentId,
			},
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

contentRouter.get("/content/name/:name", async (req: Request, res: Response) => {
	try {
		const contentName = req.params.name;

		const response = await prisma.contentList.findFirst({
			where: {
				name: contentName,
			},
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

contentRouter.put("/content/:id", async (req: Request, res: Response) => {
	try {
		const contentId = req.params.id;
		const contentStatus = req.body.content_status;

		const contentStatusResponse = await prisma.contentStatus.findFirst({
			where: {
				status: contentStatus,
			},
		});

		const response = await prisma.contentList.update({
			where: { id: contentId },
			data: {
				content_status: contentStatusResponse?.id,
			},
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

contentRouter.delete("/content/:id", async (req: Request, res: Response) => {
	try {
		const contentId = req.params.id;

		const response = await prisma.contentList.delete({
			where: {
				id: contentId,
			},
		});

		return res.status(200).json(response);
	} catch (e: any | undefined) {
		throw new Error(e.message);
	}
});

export default contentRouter;
