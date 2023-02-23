import fs from 'fs';
import * as cfg from '../utilities/appConfigs';
const sharp = require('sharp');
const path = require('path');

const resizeImage = async (fileName: string, height: number, width: number) => {
  console.log('Gathering file paths.');
  const fullImagePath: string =
    cfg.ASSET_PATH + cfg.IMAGES_URL_PART + fileName + cfg.FILE_EXT;
  const thumbFileName: string = `${fileName}_thumb_${height.toString()}_${width.toString()}`;
  const outputImage: string = path.resolve(
    cfg.ASSET_PATH + cfg.THUMBS_URL_PART + thumbFileName + cfg.FILE_EXT
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
  var fullImagePath: string =
    cfg.ASSET_PATH + cfg.IMAGES_URL_PART + fileName + cfg.FILE_EXT;
  if (processed) {
    fullImagePath =
      cfg.ASSET_PATH + cfg.THUMBS_URL_PART + fileName + cfg.FILE_EXT;
  }
  console.log(`Attempt to access ${path.resolve(fullImagePath)}`);
  return fs.existsSync(path.resolve(fullImagePath));
};

const removeThumb = (fileName: string) => {
  const imageDir: string = path.resolve(
    cfg.ASSET_PATH + cfg.THUMBS_URL_PART + fileName + cfg.FILE_EXT
  );
  fs.unlink(imageDir, (err) => {
    if (err) throw err;
    console.log(`${imageDir} removed.`);
  });
};

module.exports = {
  resizeImage,
  fileExists,
  removeThumb,
};
