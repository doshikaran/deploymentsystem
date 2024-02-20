"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const express_1 = __importDefault(require("express"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "64c1cf3c53779b370a0df2f7edbcd1ee",
    secretAccessKey: "2bd1a1ef7335622bceb39b5e0cad23c0f9bdbe93b57ee979ca0a42062a73d07b",
    endpoint: "https://a0638756644cedebb06d73f0c9d15fdf.r2.cloudflarestorage.com",
});
const app = (0, express_1.default)();
app.get("/*", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // id.100xdevs.com
    const host = request.hostname;
    const id = host.split(".")[0];
    const filePath = request.path;
    const contents = yield s3
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
}));
app.listen(3001);
