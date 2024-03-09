import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { id } = JSON.parse(request.body);

  if (id === undefined) {
    response.status(400).json({ error: "id missing" });
    return;
  }

  const { data, error } = await supabase
    .from("image")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong" });
    return
  }

  response.status(200).json({
    data: id + " removed",
  });
}

export default allowCors(handler);
