import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "64c1cf3c53779b370a0df2f7edbcd1ee",
    secretAccessKey: "2bd1a1ef7335622bceb39b5e0cad23c0f9bdbe93b57ee979ca0a42062a73d07b",
    endpoint: "https://a0638756644cedebb06d73f0c9d15fdf.r2.cloudflarestorage.com"
})

export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "deploymentsystem",
        Key: fileName,
    }).promise();
    console.log(response);
}