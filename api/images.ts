import { supabase } from "./_supabase";
import allowCors from "./_cors";

async function handler(request, response) {
  const { data, error } = await supabase
    .from('image')
    .select();
  response.status(error ? 500 : 200).json(data);
}

export default allowCors(handler);
