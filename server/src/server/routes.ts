import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

router.get("/", (req: Request, res: Response) => {
	res.json({ message: "Teste" });
});

router.get("/animes", async (req: Request, res: Response) => {
	const animes = await prisma.contentList.findMany({
		where: { name: "Os Mimios" },
	});

	return res.status(200).json(animes);
});

export default router;
