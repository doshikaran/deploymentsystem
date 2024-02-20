import { S3 } from "aws-sdk";
import express from "express";

const s3 = new S3({
  accessKeyId: "",
  secretAccessKey:
    "",
  endpoint: "",
});

const app = express();

app.get("/*", async (request, response) => {
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


