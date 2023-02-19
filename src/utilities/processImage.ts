const sharp = require('sharp');

const resizeImage = (
  fileName: string,
  height: number,
  width: number
): string => {
  const inputImage = `../../images/${fileName}.jpg`;
  const outputImage = `../../images/${fileName}_thumb.jpg`;

  const resizer = sharp(inputImage)
    .resize({
      height: height,
      width: width
    })
    .toFile(outputImage);
  return resizer;
};

module.exports = {
  resizeImage,
};
