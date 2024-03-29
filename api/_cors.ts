import { VercelRequest, VercelResponse, VercelApiHandler } from "@vercel/node";
import {supabase} from "./_supabase";
const allowCors =
  (fn: VercelApiHandler) => async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Supabase-Auth"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    const authToken = req.headers['x-supabase-auth'] as string;

    if (authToken) {
      supabase.auth.setAuth(authToken);
    }

    return fn(req, res);
  };

export default allowCors;
