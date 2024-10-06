import { prisma } from "@/lib/db";

export const getPosts = async () => {
	try {
		const posts = await prisma.galleryPost.findMany();

		return posts;
	} catch {
		return null;
	}
}

export const getPostById = async (id: string) => {
	try {
		const post = await prisma.galleryPost.findUnique({
			where: { id }
		});

		return post;
	} catch {
		return null;
	}
}
