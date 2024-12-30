import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "0.0.0.0",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export default minioClient;