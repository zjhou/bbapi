import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
export default async function handler(request, response) {
  const { data, error } = await supabase
    .from('image')
    .select();
  response.status(error ? 500 : 200).json(data);
}
