import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  // Storage.put will store the file object publicly while Storage.vault.put will store it privately
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
  // console.log(filename);
  return stored.key;
}

// export async function s3Delete(file) {
//   const params = {
//   Bucket: s3BucketName,
//   Key: "filename" //if any sub folder-> path/of/the/folder.ext
//   }
// }