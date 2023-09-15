import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";


const link = createHttpLink({
uri: "https://api.wrestlingworld.co/graphql",
credentials: 'same-origin'
});


const client = new ApolloClient({
link,
cache: new InMemoryCache(),
defaultOptions: {
  watchQuery: {
      fetchPolicy: 'cache-and-network',
  }
},
});

export default client;

