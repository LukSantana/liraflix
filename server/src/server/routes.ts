import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const router = Router();

const prisma = new PrismaClient();

router.get("/contentlist", async (req: Request, res: Response) => {
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
});

router.post("/content", async (req: Request, res: Response) => {
	const body = req.body;

	const contentName = body.name;

	const contentStatusResponse = await prisma.contentStatus.findFirst({
		where: {
			status: body.content_status,
		},
	});
	const contentStatus = contentStatusResponse?.id

	const contentTypeResponse = await prisma.contentType.findFirst({
		where: {
			name: body.content_type,
		},
	});
	const contentType = contentTypeResponse?.id

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
		genres: genres,
		images: images,
	};

	console.log(queryData);

	const response = await prisma.contentList.create({
		data: queryData,
	});

	return res.status(200).json(response);
});

export default router;
