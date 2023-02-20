import express from 'express';

import * as appConfigs from '../../utilities/appConfigs';
const { resizeImage, fileExists } = require('../../utilities/processImage.ts');
const path = require('path');
const images = express.Router();

const fullURL = `${appConfigs.HOSTNAME}:${appConfigs.PORT}`;

images.get('/', (req, res) => {
  res.send('Images route');
});

images.get('/view', (req, res) => {
  const queryData = req.query;
  const fileName = queryData.filename;
  var html = '';

  // Input validation
  if (fileName === undefined) {
    res.send('Missing Filename');
  }

  if (fileExists(fileName, false)) {
    console.log('Found Image');
    const imagePath = `${appConfigs.STATIC_URL_PART}${appConfigs.IMAGES_URL_PART}${fileName}.jpg`;
    html = `<img src='../..${imagePath}' alt='image'></img>`;
  }
  else if (fileExists(fileName, true)) {
    console.log('Found Thumb');
    const imagePath = `${appConfigs.STATIC_URL_PART}${appConfigs.THUMBS_URL_PART}${fileName}.jpg`;
    html = `<img src='../..${imagePath}' alt='image'></img>`;
  }
  else {
    res.send('File not found');
  }
  
  res.send(html);
});

images.get('/resize', (req, res) => {
  const queryData = req.query;
  const fileName = queryData.filename;
  const height = queryData.height;
  const width = queryData.width;

  // Input validation
  /*
  if (fileName === undefined) {
    res.send('Missing Filename');
  }
  else if (height === undefined) {
    res.send('Missing height');
  }
  else if (width === undefined) {
    res.send('Missing width');
  }

  const imagePath = `${appConfigs.STATIC_URL}${appConfigs.IMAGES_URL_PART}${fileName}.jpg`;

  if (!fileExists(imagePath)) {
    res.send('File not found');
  }

  console.log('Input validation passed');
  */
  const imagePath = `${appConfigs.STATIC_URL_PART}${appConfigs.IMAGES_URL_PART}${fileName}.jpg`;
  console.log(imagePath);
  const html = `<img src='../..${imagePath}' alt='image'></img>`;
  //res.send(html);

  async function resize(fileName: string, height: number, width: number) {
    try {
      await resizeImage(fileName, height, width);
    } catch (error) {
      console.log(error);
      res.send('Image processing failed');
    }
  }

  //resize(req.query.fileName, req.queryheight ,req.width)
  res.sendFile(imagePath);
});

export default images;
