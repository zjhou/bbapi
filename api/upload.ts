import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_supabase";
import allowCors from "./_cors";
import { uploadToOss } from "./_oss_uploader";
async function handler(request: VercelRequest, response: VercelResponse) {
  const { pid, projectName, fileName, width, height } = request.query;
  const { error } = await supabase
    .from("image")
    .insert([{ title: fileName }]);

  if (error) {
    response.status(400).end({
      msg: "Auth failed.",
    });
    return;
  }

  let result;
  try {
    result = await uploadToOss(
      `image/${projectName || 'illustration/illustration'}/${fileName}`,
      request.body
    );
  } catch (e) {
    console.log('upload to oss failed.');
    response.status(500).end({
      msg: JSON.stringify(e),
    });
  }

  if (!result) {
    return;
  }

  let updateResult, updateError
  if (pid) {
    const { data, error} = await supabase
      .from("image")
      .update({ src: result.url, project: pid, width, height })
      // @ts-ignore
      .match({ id: data[0].id });
    updateResult = data;
    updateError = error;
  }

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
