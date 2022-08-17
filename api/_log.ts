import got from 'got';
import { VercelRequest } from "@vercel/node";
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
  const visitorCity = req.headers["x-vercel-ip-city"] as string;

  const baseCity = new Set([
    'Changsha',
    'Jianning',
    'Kowloon',
    'Nanjing'
  ]);

  const sendNotice = (city: string) => {
    return notify(`new visitor from ${city}`);
  }

  const sendLog = (city: string) => {
    return log({ city });
  }

  return visitorCity && !baseCity.has(visitorCity)
    ? Promise.all([sendLog(visitorCity), sendNotice(visitorCity)])
    : Promise.resolve();
};
