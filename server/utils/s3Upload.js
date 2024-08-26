import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });

// Configure AWS SDK v3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const uploadPDFToS3 = async (filePath, bucketName, key) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ContentType: 'application/pdf',
    };

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    console.log('File uploaded successfully:', key);
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};

const filePath = '/home/silentfellow/Downloads/Telegram Desktop/[ME] Ch-6 Wistoria\'s Wand and Sword [@Manga_Edge].pdf';
const bucketName = process.env.AWS_S3_BUCKET;

const basePath = path.basename(filePath);
const currentDate = new Date().toISOString().split('T')[0];
const key = `${basePath}_${currentDate}.pdf`;

uploadPDFToS3(filePath, bucketName, key);
