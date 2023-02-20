import fs from 'fs';
import * as appConfigs from '../utilities/appConfigs';
const sharp = require('sharp');
const path = require('path');

const resizeImage = (
  fileName: string,
  height: number,
  width: number
): string => {
  const imageFullPath = `${appConfigs.ASSET_PATH}${appConfigs.IMAGES_URL_PART}${fileName}.jpg`;
  const outputImage = `${appConfigs.ASSET_PATH}${appConfigs.IMAGES_URL_PART}${fileName}_thumbs_${height.toString()}_${width.toString()}.jpg`;;

  const resizer = sharp(imageFullPath)
    .resize({
      height: height,
      width: width,
    })
    .toFile(outputImage);
  return resizer;
};

const fileExists = (fileName: string, processed: boolean = true): boolean => {
  var imageFullPath = `${appConfigs.ASSET_PATH}${appConfigs.IMAGES_URL_PART}${fileName}.jpg`;
  if (processed) {
    imageFullPath = `${appConfigs.ASSET_PATH}${appConfigs.THUMBS_URL_PART}${fileName}.jpg`;
  }
  console.log(`Attempt to access ${path.resolve(imageFullPath)}`);
  return fs.existsSync(path.resolve(imageFullPath));
};

module.exports = {
  resizeImage,
  fileExists,
};
