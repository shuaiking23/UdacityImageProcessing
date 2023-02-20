import express from 'express';
import routes from './routes/index';
import * as appConfigs from './utilities/appConfigs';

const app = express();
const fullURL = `${appConfigs.HOSTNAME}:${appConfigs.PORT}`;

app.use('/api', routes);
app.use(`${appConfigs.STATIC_URL_PART}`, express.static('assets'));

app.get('*', function (req, res) {
  res.status(404).send('Page Not Found!');
});

app.listen(appConfigs.PORT, () => {
  console.log(`Server started at ${fullURL}`);
});
