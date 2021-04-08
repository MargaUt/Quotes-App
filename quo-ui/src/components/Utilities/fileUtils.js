import { forEach } from 'lodash';
export async function toBase64(file) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function validateSize(file, maxSize) {
  return file.size < maxSize;
}

export async function generateFileObject(files) {
  const promises = [];
  forEach(files, (file) => {
    promises.push(
      toBase64(file).then((res) => {
        return {
          content_type: file.type,
          data: res,
        };
      }),
    );
  });
  const fileObjects = await Promise.all(promises);
  return fileObjects[0];
}

export function getFileName(file) {
  return file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/ /g, '_')
    .toLowerCase();
}

export function getFileNamesFromJson(attachments = {}) {
  return Object.keys(attachments);
}
