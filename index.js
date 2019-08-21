import http from 'http';
import app from './app';
import connectDb from './models';
import { env, logger } from './helpers/utils';

const port = env('PORT', 3000);
app.set('port', port);

connectDb()
  .then(() => {
    http.createServer(app)
      .listen(port)
      .on('listening', () => logger.log(`listening on port ${port}`));
  })
  .catch(logger.log);
