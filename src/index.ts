import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import {typeDefs} from './schema/typeDefs.js';
import {resolvers} from './resolver/resolver.js'
import {PizzaAPI} from "./api/PizzaAPI.js";


interface ContextValue {
    dataSources: {
        pizzaAPI: PizzaAPI;
    };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
      context: async () => {
          const { cache } = server;
          return {
              // We create new instances of our data sources with each request,
              // passing in our server's cache.
              dataSources: {
                  pizzaAPI: new PizzaAPI(),
              },
          };
      }
  });

  console.log(`🚀  Server ready at: ${url}`);