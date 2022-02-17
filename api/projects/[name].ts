import { supabase } from "../_supabase";
import allowCors from "../_cors";

async function handler(request, response) {
  const { name } = request.query;
  const { data: project, error } = await supabase
    .from('project')
    .select('name, id')
    .eq('name', name);

  const {data: images } = await supabase
    .from('image')
    .select()
    .eq('project', project[0].id);

  response.status(error ? 500 : 200).json({
    ...project[0],
    images,
  });
}

export default allowCors(handler);
