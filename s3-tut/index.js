const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
  },
});

/////////Get Object URL
async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "testbukt-private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
const url = async () => console.log("url is", await getObjectURL("4.png"));
url();

/////////Put Object
async function putObject(filename, ContentType) {
  const command = new PutObjectCommand({
    Bucket: "testbukt-private",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: ContentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
async function putURL() {
  console.log(
    "url for upload",
    await putObject(`image-${Date.now()}.jpeg`, "image/jpeg")
  );
}
putURL();

/////listObjects
async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: "testbukt-private",
    Key: "/",
  });
  const result = await s3Client.send(command);
  return result;
}
async function list() {
  console.log("url for upload", await listObjects());
}
list();

/////Delete Object
async function deleteObject() {
  const command = new DeleteObjectCommand({
    Bucket: "testbukt-private",
    Key: "4.png",
  });

  await s3Client.send(command);
}
deleteObject();
