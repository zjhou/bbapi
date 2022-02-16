import { supabase } from "../_supabase";

export default async function handler(request, response) {
  const { pid } = request.query;
  const { data: project, error } = await supabase
    .from('project')
    .select('name, id')
    .eq('id', pid);

  const {data: images } = await supabase
    .from('image')
    .select()
    .eq('project', pid);

  response.status(error ? 500 : 200).json({
    ...project[0],
    images,
  });
}
