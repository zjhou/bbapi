import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";
import { uploadToOss } from "./_oss_uploader";
async function handler(request: VercelRequest, response: VercelResponse) {
  const { pid, projectName, fileName, width, height } = request.query;
  const { data, error } = await supabase
    .from("image")
    .insert([{ title: fileName }]);

  if (error) {
    console.log(error);
    response.status(400).end({
      msg: "You are not bb king",
    });
    return;
  }

  const result = await uploadToOss(
    `image/${projectName}/${fileName}`,
    request.body
  );

  const { data: updateResult, error: updateError } = await supabase
    .from("image")
    .update({ src: result.url, project: pid, width, height })
    // @ts-ignore
    .match({ id: data[0].id });

  if (updateError) {
    console.log(updateError);
    response.status(500).end();
    return;
  }

  response.status(200).json({
    ...updateResult,
    ...result,
  });
}

export default allowCors(handler);
