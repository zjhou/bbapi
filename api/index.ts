const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.bbki.ng";

import { VercelRequest, VercelResponse } from "@vercel/node";

const api = (path: string) => `${ENDPOINT}/${path}`;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.status(200).json({
    images: api("images"),
    projects: api("projects"),
    movies: api("movies"),
    books: api("books"),
  });
}
