import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const router = Router();

const prisma = new PrismaClient();

router.get("/animes/:apiKey", async (req: Request, res: Response) => {
	const apiKey = req.params.apiKey;
	let data: {
		genres: Array<{
			id: number;
			name: string;
		}>;
	};
	await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		method: "GET",
		credentials: "include",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((res) => {
			data = res;
		});

	const genres = data!.genres;

	genres.forEach(
		async (genre: { id: number; name: string }) =>
			await prisma.genres.create({
				data: {
					id: randomUUID(),
					name: genre.name,
					content_type: 'Movie'
				},
			})
	);

	return res.status(200);
});

// router.post("/watchlist", async (req: Request, res: Response) => {
// 	const animes = await prisma.contentList.create({
// 		data: {

// 		}
// 	});

// 	return res.status(200).json(animes);
// });

export default router;
