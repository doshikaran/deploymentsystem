import { S3 } from "aws-sdk";
import express from "express";

const s3 = new S3({
  accessKeyId: "64c1cf3c53779b370a0df2f7edbcd1ee",
  secretAccessKey:
    "2bd1a1ef7335622bceb39b5e0cad23c0f9bdbe93b57ee979ca0a42062a73d07b",
  endpoint: "https://a0638756644cedebb06d73f0c9d15fdf.r2.cloudflarestorage.com",
});

const app = express();

app.get("/*", async (request, response) => {
  // id.100xdevs.com
  const host = request.hostname;
  const id = host.split(".")[0];
  const filePath = request.path;
  const contents = await s3
    .getObject({
      Bucket: "deploymentsystem",
      Key: `dist/${id}${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";
  response.set("Content-Type", type);

  response.send(contents.Body);
});

app.listen(3001);


