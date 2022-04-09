import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../_supabase";
import allowCors from "../_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { name } = request.query;
  const { data: project, error } = await supabase
    .from("project")
    .select("name, id, description")
    .eq("name", name);

  if (!project) {
    response.status(error ? 500 : 200).json({
      images: [],
    });
    return;
  }

  const { data: images } = await supabase
    .from("image")
    .select()
    .order("id", { ascending: false })
    .eq("project", project[0].id);

  response.status(error ? 500 : 200).json({
    ...project[0],
    images,
  });
}

export default allowCors(handler);
