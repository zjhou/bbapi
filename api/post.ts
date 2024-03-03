import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { title, content } = request.query;
  if (!title || !content) {
    response.status(400).json({ error: "Title and content are required" });
    return;
  }

  const { data, error } = await supabase.from("post").insert({ title, content });
  console.log(error);
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
