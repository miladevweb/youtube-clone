import { Context } from '../route';
import { gql } from '@apollo/client';
import { User } from '@/interfaces/interface';

export const typeDefs = gql`
   type Query {
      getUser(username: String!): User
   }

   type Mutation {
      createUser(username: String!, email: String!, thumbnail: String!): User
   }

   type User {
      id: Int
      username: String!
      email: String!
      thumbnail: String!
      videos: [Video]
      likedVideos: [Video]
      profile: Profile
      followers: [Profile]
   }
`;

export const resolvers = {
   Query: {
      getUser: async (_parent: any, { username }: User, context: Context) => {
         try {
            const user = await context.prisma.user.findUnique({
               where: {
                  username,
               },
            });

            if (!user) throw new Error('User not found');
            return user;
         } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
         }
      },
   },

   Mutation: {
      createUser: async (_parent: any, { username, email, thumbnail }: User, context: Context) => {
         try {
            return await context.prisma.user.create({
               data: {
                  username,
                  email,
                  thumbnail,
                  profile: {
                     create: {
                        profile_username: username,
                     },
                  },
               },
            });
         } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
         }
      },
   },

   User: {
      videos: async (parent: User, _args: any, context: Context) => {
         return await context.prisma.video.findMany({
            where: {
               author_id: parent.id,
            },
         });
      },

      likedVideos: async (parent: User, _args: any, context: Context) => {
         return await context.prisma.video.findMany({
            where: {
               likes: {
                  some: {
                     id: parent.id,
                  },
               },
            },
         });
      },

      profile: async (parent: User, _args: any, context: Context) => {
         return await context.prisma.profile.findUnique({
            where: {
               user_id: parent.id,
            },
         });
      },

      followers: async (parent: User, _args: any, context: Context) => {
         return await context.prisma.profile.findMany({
            where: {
               following: {
                  some: {
                     username: parent.username,
                  },
               },
            },
         });
      },
   },
};
