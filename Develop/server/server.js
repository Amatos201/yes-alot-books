const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const {ApolloServer} = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3001;
const { typeDefs, resolvers } = require('./schemas');
const { type } = require('os');
const { Http2ServerRequest } = require('http2');

const server = new ApolloServer ({
  typeDefs,
  resolvers
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '../client/build')))
}
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log('use GraphQL at http://localhost:${PORT}${server.graphqlPath}');
  })
};
startApolloServer(typeDefs, resolvers);


// if we're in production, serve client/build as static assets
//if (process.env.NODE_ENV === 'production') {
  //app.use(express.static(path.join(__dirname, '../client/build')));
//}

//app.use(routes);

//db.once('open', () => {
  //app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
//});
