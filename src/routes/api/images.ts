import express from 'express';
const {resizeImage} = require('../../utilities/processImage.ts');
const path = require('path');
const images = express.Router();

const imagesPath = '../../../images/';
const thumbsPath = '../../../images/thumbs/';

images.get('/', (req, res) => {
  res.send('Images route');
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

  console.log('Input validation passed');
  */
  const testFile = path.resolve(`${__dirname}\\${imagesPath}fjord.jpg`);
  console.log(__dirname);
  console.log(testFile);
  const html = `<img src='file:///${testFile}'></img>`
  res.send(html);

  async function resize(fileName: string, height: number, width: number) {
    try {
      await resizeImage(fileName, height, width);
    }
    catch (error) {
      console.log(error);
      res.send('Image processing failed');
    }
    
  }

  //resize(req.query.fileName, req.queryheight ,req.width)
  res.sendFile(testFile);
});

export default images;
