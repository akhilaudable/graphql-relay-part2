import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import graphQLHTTP from 'express-graphql';
import {clean} from 'require-clean';
import {exec} from 'child_process';
import Schema from './data/schema';
import chokidar from 'chokidar';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

let graphQLServer;
let appServer;

function startAppServer() {

  // setup webpack-dev-server
const compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  },
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
});

 appServer = new WebpackDevServer(compiler, devServerOptions);
appServer.use('/', express.static(path.resolve(__dirname, 'public')));

appServer.listen(APP_PORT, '127.0.0.1', () => {
  console.log(`App is running on http://localhost:${APP_PORT}`);
});

}

function startGraphQLServer() {
  // Expose a GraphQL endpoint
clean('./data/schema');

  const graphQLApp = express();
  graphQLApp.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
  }));
  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(
      `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
    );
  });
}

function startServers(callback) {

  if (appServer) {
    appServer.listeningApp.close();
  }
  if (graphQLServer) {
    graphQLServer.close();
  }
  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout);
    if (callback) {
      callback();
    }
    startGraphQLServer();
    startAppServer();
  });
}

const watcher = chokidar.watch('./data/{database,schema}.js');
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() =>
    console.log('Restart your browser to use the updated schema.')
  );
});

startServers();
