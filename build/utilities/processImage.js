"use strict";
var sharp = require('sharp');
var resizeImage = function (fileName, height, width) {
    var inputImage = "../../images/".concat(fileName, ".jpg");
    var outputImage = "../../images/".concat(fileName, "_thumb.jpg");
    var resizer = sharp(inputImage)
        .resize({
        height: height,
        width: width
    })
        .toFile(outputImage);
    return resizer;
};
module.exports = {
    resizeImage: resizeImage,
};
