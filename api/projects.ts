import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request: VercelRequest, response: VercelResponse) {
  const { data, error } = await supabase
    .from("project")
    .select("name, id, status, description, order")
    .order("order")
    .eq("status", 1);
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
