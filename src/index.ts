import express from 'express';
import routes from './routes/index'

const app = express();
const port = 3001;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
