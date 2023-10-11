import { Context } from '../route';
import { gql } from '@apollo/client';
import { Profile } from '@/interfaces/interface';

export const typeDefs = gql`
   type Query {
      subs(profileId: Int!): Profile
      followers(profileId: Int!): Profile
   }

   type Mutation {
      addFollow(userId: Int!, profileId: Int!): Boolean
      removeFollow(userId: Int!, profileId: Int!): Boolean
   }

   type Profile {
      id: Int
      user: User
      following: [User]
      profile_username: String
   }
`;

export const resolvers = {
   Query: {
      followers: async (_parent: any, { profileId }: { profileId: number }, context: Context) => {
         return await context.prisma.profile.findUnique({
            where: {
               id: profileId,
            },
         });
      },

      subs: async (_parent: any, { profileId }: { profileId: number }, context: Context) => {
         return await context.prisma.profile.findUnique({
            where: {
               id: profileId,
            },
         });
      },
   },
   Mutation: {
      addFollow: async (_parent: any, { userId, profileId }: { userId: number; profileId: number }, context: Context) => {
         try {
            await context.prisma.user.update({
               where: {
                  id: userId,
               },
               data: {
                  followers: {
                     connect: {
                        id: profileId,
                     },
                  },
               },
            });
            return true;
         } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
         }
      },

      removeFollow: async (_parent: any, { userId, profileId }: { userId: number; profileId: number }, context: Context) => {
         try {
            await context.prisma.user.update({
               where: {
                  id: userId,
               },
               data: {
                  followers: {
                     disconnect: {
                        id: profileId,
                     },
                  },
               },
            });
            return true;
         } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
         }
      },
   },

   Profile: {
      user: async (parent: Profile, _args: any, context: Context) => {
         return await context.prisma.user.findUnique({
            where: {
               id: parent.user_id,
            },
         });
      },

      following: async (parent: Profile, _args: any, context: Context) => {
         return await context.prisma.user.findMany({
            where: {
               followers: {
                  some: {
                     id: parent.id,
                  },
               },
            },
         });
      },
   },
};
