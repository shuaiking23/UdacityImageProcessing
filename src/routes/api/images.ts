import express from 'express';

import * as appConfigs from '../../utilities/appConfigs';
const { resizeImage, fileExists } = require('../../utilities/processImage');
const path = require('path');
const images = express.Router();
const fileExt = '.jpg';

images.get('/', (req, res) => {
  res.send('Images route');
});

images.get('/view', (req: express.Request, res: express.Response) => {
  const queryData = req.query;
  const fileName: string = queryData.filename as string;
  let html: string = '';

  // Input validation
  if (fileName === undefined) {
    res.status(400).send('Missing Filename');
    return;
  }

  if (fileExists(fileName, false)) {
    console.log('Found Image');
    const imagePath: string =
      appConfigs.STATIC_URL_PART +
      appConfigs.IMAGES_URL_PART +
      fileName +
      fileExt;
    html = `<center><img src='${imagePath}' alt='image'></img></center>`;
  } else if (fileExists(fileName, true)) {
    console.log('Found Thumb');
    const imagePath: string =
      appConfigs.STATIC_URL_PART +
      appConfigs.THUMBS_URL_PART +
      fileName +
      fileExt;
    html = `<center><img src='${imagePath}' alt='image'></img></center>`;
  } else {
    res.status(400).send('File not found');
    return;
  }

  res.send(html);
  return;
});

images.get('/resize', (req: express.Request, res: express.Response) => {
  const queryData = req.query;
  console.log(queryData);
  const fileName: string = queryData.filename as unknown as string;
  const height: number = parseInt(queryData.height as string);
  const width: number = parseInt(queryData.width as string);

  // Input validation
  console.log('Checking Params...');
  console.log(typeof height);
  console.log(width);
  if (fileName === undefined) {
    res.status(400).send('Missing Filename');
    return;
  } else if (height === undefined) {
    res.status(400).send('Missing height');
    return;
  } else if (width === undefined) {
    res.status(400).send('Missing width');
    return;
  } else if (isNaN(height)) {
    res.status(400).send('Invalid height');
    return;
  } else if (isNaN(width)) {
    res.status(400).send('Invalid width');
    return;
  }

  console.log('Looking for file...');
  if (!fileExists(fileName)) {
    res.status(400).send('File not found');
    return;
  }

  console.log('Input validation passed');

  async function resize(fileName: string, height: number, width: number) {
    try {
      console.log(`Params = ${fileName}, ${height}, ${width}`);
      const outputImage = await resizeImage(fileName, height, width);
      const imageDisplayPath = outputImage.split(process.cwd())[1];
      console.log(`outputImage ${outputImage}`);
      const html = `<center><img src='${imageDisplayPath}' alt='image'></img></center>`;
      res.status(200).send(html);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).send('Image processing failed');
      return;
    }
  }

  resize(fileName, height, width);
});

export default images;
