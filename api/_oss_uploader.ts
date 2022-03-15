import OSS from "ali-oss";

const client = new OSS({
  region: "oss-cn-shenzhen",
  accessKeyId: process.env.OSS_ACCESS_KEY_ID as string,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET as string,
  bucket: process.env.OSS_BUCKET_NAME,
  endpoint: process.env.OSS_BUCKET_ENDPOINT,
  secure: true,
});

export const uploadToOss = (name: string, file: Buffer) => {
  return client.put(name, file);
};
