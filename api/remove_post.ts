import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { title } = JSON.parse(request.body);

  if (!title) {
    response.status(400).json({ error: "title missing" });
    return;
  }

  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("title", title);

  if (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
    return
  }

  response.status(200).json({
    data: title + " removed",
  });
}

export default allowCors(handler);
