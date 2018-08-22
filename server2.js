'use strict';

const Fs = require('fs');
const Path = require('path');
const Graphi = require('graphi');
const Hapi = require('hapi');

const schema = Fs.readFileSync(Path.join(__dirname, 'schema2.gql'), 'utf8');

const resolvers = {
  getUser: ({ email }) => {
    return {
      id: 'foo',
      email,
      firstname: 'Billy',
      lastname: 'Joel'
    }
  },
  User: {
    address: function (user) {
      console.log('user', user);
      return {
        lineone: 'something',
        linetwo: null,
        state: 'MO',
        zipcode: '64155'
      }
    }
  }
};

const main = async () => {
  const server = Hapi.server({ port: 8080 });

  await server.register({ plugin: Graphi, options: { schema, resolvers } });
  await server.start();
};

main();

