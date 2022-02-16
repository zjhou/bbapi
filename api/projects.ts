import { supabase } from "./_supabase";

export default async function handler(request, response) {
  const { data, error } = await supabase
    .from('project')
    .select('name, id');
  response.status(error ? 500 : 200).json(data);
}
