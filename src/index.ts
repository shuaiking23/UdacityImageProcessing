import express from 'express';
import routes from './routes/index'

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('*', function(req, res){
  res.status(404).send('Page Not Found!');
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
