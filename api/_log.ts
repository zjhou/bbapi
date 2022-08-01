import got from 'got';
import { VercelRequest, VercelResponse, VercelApiHandler } from "@vercel/node";
import {notify} from "./_notify";

export const log = (event: Object) => {
  if (!process.env.CUSTOM_AXIOM_INGEST_TOKEN) {
    return Promise.reject('TOKEN MISSING');
  }

  if (!process.env.CUSTOM_AXIOM_INGEST_ENDPOINT) {
    return Promise.resolve('LOGGER ENDPOINT 404');
  }

  return got.post(
    process.env.CUSTOM_AXIOM_INGEST_ENDPOINT,
    {
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/x-ndjson",
        Authorization: `Bearer ${process.env.CUSTOM_AXIOM_INGEST_TOKEN}`
      }
    }
  ).json();
};

export const logCity = (req: VercelRequest) => {
  const city = req.headers["x-vercel-ip-city"];

  const sendNotice = () => {
    const baseCity = new Set(['Changsha'])
    if (baseCity.has(city as string)) {
      return Promise.resolve();
    }
    return notify(`new visitor from ${city}`);
  }

  return city
    ? Promise.all([log({ city }), sendNotice()])
    : Promise.resolve();
}
