const ENDPOINT = "https://api.bbki.ng";
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
  });
}
