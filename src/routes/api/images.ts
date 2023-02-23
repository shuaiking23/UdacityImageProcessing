import express from 'express';

import * as cfg from '../../utilities/appConfigs';
const {
  resizeImage,
  fileExists,
  removeThumb,
} = require('../../utilities/processImage');
const path = require('path');
const route = express.Router();
const fileExt = '.jpg';

route.get('/view', (req: express.Request, res: express.Response) => {
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
      cfg.STATIC_URL_PART + cfg.IMAGES_URL_PART + fileName + fileExt;
    html = `<center><img src='${imagePath}' alt='image'></img></center>`;
  } else if (fileExists(fileName, true)) {
    console.log('Found Thumb');
    const imagePath: string =
      cfg.STATIC_URL_PART + cfg.THUMBS_URL_PART + fileName + fileExt;
    html = `<center><img src='${imagePath}' alt='image'></img></center>`;
  } else {
    res.status(400).send('File not found');
    return;
  }

  res.status(200).send(html);
  return;
});

route.get('/resize', (req: express.Request, res: express.Response) => {
  const queryData = req.query;
  console.log(queryData);
  const fileName: string = queryData.filename as unknown as string;
  const height: number = parseInt(queryData.height as string);
  const width: number = parseInt(queryData.width as string);

  // Input validation
  console.log('Checking Params...');

  if (fileName === undefined) {
    res.status(400).send('Missing Filename');
    return;
  } else if (queryData.height === undefined) {
    res.status(400).send('Missing Height');
    return;
  } else if (queryData.width === undefined) {
    res.status(400).send('Missing Width');
    return;
  } else if (isNaN(height)) {
    res.status(400).send('Invalid Height');
    return;
  } else if (isNaN(width)) {
    res.status(400).send('Invalid Width');
    return;
  }

  console.log('Looking for file...');
  if (!fileExists(fileName)) {
    res.status(400).send('File not found');
    return;
  }

  console.log('Input validation passed');

  const resize = async (fileName: string, height: number, width: number) => {
    try {
      console.log(`Params = ${fileName}, ${height}, ${width}`);
      const outputImage: string = await resizeImage(fileName, height, width);
      const imageDisplayPath: string = outputImage.split(process.cwd())[1];
      console.log(`outputImage ${outputImage}`);
      const html: string = `<center><img src='${imageDisplayPath}' alt='image'></img></center>`;
      res.status(200).send(html);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).send('Image processing failed');
      return;
    }
  };

  resize(fileName, height, width);
});

route.get('/removethumb', (req: express.Request, res: express.Response) => {
  const queryData = req.query;
  const fileName: string = queryData.filename as string;
  let html: string = '';

  // Input validation
  if (fileName === undefined) {
    res.status(400).send('Missing Filename');
    return;
  }

  if (fileExists(fileName, true)) {
    console.log('Found Thumb');
    removeThumb(fileName);
    if (fileExists(fileName, true)) {
      res.status(400).send(`Unable to remove ${fileName}`);
      return;
    } else {
      res.status(200).send(`${fileName} successfully removed`);
      return;
    }
  } else {
    res.status(400).send(`${fileName} does not exist`);
    return;
  }
});

export default route;
