/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cluster = require('cluster');
const express = require('express');
const helmet = require('helmet');
const nextApp = require('next');

const config = require('../next.config.js');
const routes = require('./routes');

const isProduction = process.env.NODE_ENV === 'production';
const app = nextApp({ dev: !isProduction, conf: config });
const handler = routes.getRequestHandler(app);

const workerListener = msg => {
  if (msg.access) console.log('user access %s, worker [%d]', msg.access, msg.workerid);
};

const forkWorker = listener => {
  const worker = cluster.fork();
  console.log('worker [%d] has been created', worker.process.pid);
  worker.on('message', listener);
  return worker;
};

if (cluster.isMaster) {
  forkWorker(workerListener);
  if (process.env.NODE_ENV === 'production') forkWorker(workerListener);
} else {
  app.prepare().then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(compression());
    server.use(helmet());

    server.get('*', (req, res) => handler(req, res));

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err;
      console.log(`Server ready on http://localhost:${process.env.PORT}`);
    });
  });
}

cluster.on('exit', (worker, code, signal) => {
  console.log('worker [%d] died %s, fork a new one.', worker.process.pid, code || signal);
  forkWorker(workerListener);
});

cluster.on('online', worker => {
  console.log('worker [%d] is running.', worker.process.pid);
});
