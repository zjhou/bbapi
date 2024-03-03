import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { arg } = request.body;
  if (!arg || !arg.title || !arg.content) {
    response.status(400).json({ error: "Title and content are required" });
    return;
  }

  const { title, content } = arg;

  const { data, error } = await supabase.from("post").insert({ title, content });
  console.log(error);
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
