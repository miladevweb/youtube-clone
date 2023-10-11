import prisma from '../../../../prisma/db';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { resolvers, typeDefs } from './schema/index';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

export type Context = {
   prisma: PrismaClient;
};

const server = new ApolloServer<Context>({
   resolvers,
   typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
   context: async () => ({ prisma }),
});

export { handler as GET, handler as POST };
