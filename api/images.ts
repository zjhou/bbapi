import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request, response) {
  const { pid } = request.query;
  const imagesQuery = supabase
    .from('image')
    .select();
  const { data, error } = await (pid ? imagesQuery.eq('project', pid) : imagesQuery);
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
