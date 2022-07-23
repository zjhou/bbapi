import got from 'got';

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
