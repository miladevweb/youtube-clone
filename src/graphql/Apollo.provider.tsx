'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

export const Apollo = ({ children }: { children: React.ReactNode }) => {
   const client = new ApolloClient({
      uri: '/api/graphql',
      cache: new InMemoryCache(),
   });
   return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
