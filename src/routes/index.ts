import express from 'express';
import { default as images } from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
  const html = `<pre>Image Processing API
  View Image: /images/view?filename={}
  Resize Image: /images/resize?filename={}&height={}&width={}
  Remove Thumb /images/removethumb?filename={}</pre><br>
  <pre>Filenames:
  encenadaport
  fjord
  icelandwaterfall
  palmtunnel
  santamonica</pre>`;
  res.status(200).send(html);
});

routes.use('/images', images);

export default routes;
