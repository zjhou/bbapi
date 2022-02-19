import { supabase } from "./_supabase";
import allowCors from "./_cors";

export default (tableName: string, colString?: string) => allowCors(async (request, response) => {
  const { data, error } = await supabase
    .from(tableName)
    .select(colString);
  response.status(error ? 500 : 200).json(data);
})
