import express from 'express';
import routes from './routes/index';
import * as cfg from './utilities/appConfigs';

const app = express();
const fullURL = `${cfg.HOSTNAME}:${cfg.PORT}`;

app.use('/api', routes);
app.use(`${cfg.STATIC_URL_PART}`, express.static('assets'));

app.get('*', function (req, res) {
  res.status(404).send('Page Not Found!');
});

app.listen(cfg.PORT, () => {
  console.log(`Server started at ${fullURL}`);
});

export default app;
