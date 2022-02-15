import { supabase } from "./_supabase";

export default async function handler(request, response) {
  const { data, error } = await supabase
    .from('image')
    .select();
  response.status(error ? 500 : 200).json(data);
}
