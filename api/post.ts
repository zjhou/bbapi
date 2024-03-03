import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { name, content } = request.body;
  const { data, error } = await supabase.from("post").insert({ name, content });
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
