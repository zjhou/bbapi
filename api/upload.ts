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
    response.status(400).end({
      msg: "Auth failed.",
    });
    return;
  }

  let result;
  try {
    console.log('uploading to oss...');
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
    response.status(500).end({
      msg: "upload to oss failed. can not get result.",
    });
    return;
  }

  if (!pid) {
    response.status(200).json(result);
    return
  }

  const { data: updateResult, error: updateError} = await supabase
    .from("image")
    .update({ src: result.url, project: pid, width, height })
    // @ts-ignore
    .match({ id: data[0].id });

  if (updateError) {
    console.log(updateError);
    response.status(500).end({
      msg: "update to supabase db failed.",
    });
    return;
  }

  response.status(200).json({
    ...updateResult,
    ...result,
  });
}

export default allowCors(handler);
