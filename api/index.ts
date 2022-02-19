const ENDPOINT = 'https://api.bbki.ng';
const api = (path) => `${ENDPOINT}/${path}`;

export default async function handler(request, response) {
  response.status(200).json({
    images: api('images'),
    projects: api('projects'),
    movies: api('movies'),
  });
}
