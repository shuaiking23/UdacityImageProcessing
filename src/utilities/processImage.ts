import fs from 'fs';
import * as appConfigs from '../utilities/appConfigs';
const sharp = require('sharp');
const path = require('path');

const fileExt = '.jpg';

const resizeImage = async (fileName: string, height: number, width: number) => {
  console.log('Gathering file paths.');
  const fullImagePath =
    appConfigs.ASSET_PATH + appConfigs.IMAGES_URL_PART + fileName + fileExt;
  const thumbFileName = `${fileName}_thumbs_${height.toString()}_${width.toString()}`;
  const outputImage = path.resolve(
    appConfigs.ASSET_PATH + appConfigs.THUMBS_URL_PART + thumbFileName + fileExt
  );

  if (!fileExists(thumbFileName, true)) {
    console.log('Resizing...');
    await sharp(fullImagePath)
      .resize({
        height: height,
        width: width,
      })
      .toFile(outputImage);
  } else {
    console.log('Thumb exists. Skip resizing.');
  }

  return outputImage;
};

const fileExists = (fileName: string, processed: boolean = false): boolean => {
  var fullImagePath =
    appConfigs.ASSET_PATH + appConfigs.IMAGES_URL_PART + fileName + fileExt;
  if (processed) {
    fullImagePath =
      appConfigs.ASSET_PATH + appConfigs.THUMBS_URL_PART + fileName + fileExt;
  }
  console.log(`Attempt to access ${path.resolve(fullImagePath)}`);
  return fs.existsSync(path.resolve(fullImagePath));
};

//resizeImage('fjord', 50, 50);

module.exports = {
  resizeImage,
  fileExists,
};
