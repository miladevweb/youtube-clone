import { Video, VideoTagStringArray } from '@/interfaces/interface';
import { gql } from '@apollo/client';
import { Context } from '../route';
import { Prisma } from '@prisma/client';

export const typeDefs = gql`
   type Query {
      getVideo(id: Int!): Video
      getAllVideos(limit: Int!): [AllVideos]
      getSearch(search: String!): [Video]
   }

   type Mutation {
      createVideo(title: String!, description: String, thumbnail: String!, url: String!, tags: [String!], author_id: Int!): CreateVideo
      deleteVideo(id: Int!): String
      updateVideo(id: Int!, title: String, description: String, thumbnail: String, tags: [String]): String
      # Likes
      likeVideo(userId: Int!, videoId: Int!): Boolean
      unlikeVideo(userId: Int!, videoId: Int!): Boolean
   }

   type CreateVideo {
      message: String
      video: Video
   }

   type Video {
      id: Int
      title: String
      description: String
      views: Int
      thumbnail: String
      url: String
      createdAt: String
      updatedAt: String
      # Relation
      author: User
      tags: [Tag]
      likes: [User]
   }

   type AllVideos {
      id: Int
      title: String
      thumbnail: String
      views: Int
      createdAt: String
      author_username: String
      author_thumbnail: String
   }
`;

export const resolvers = {
   Query: {
      getVideo: async (_parent: any, { id }: { id: number }, context: Context) => {
         const video = await context.prisma.video.findUnique({
            where: {
               id,
            },
         });

         if (!video) throw new Error('Video not found');

         return await context.prisma.video.update({
            where: {
               id,
            },
            data: {
               views: {
                  increment: 1,
               },
            },
         });
      },
      getAllVideos: async (_parent: any, { limit }: { limit: number }, context: Context) => {
         return await context.prisma.$queryRaw(Prisma.sql`
          SELECT v.title, v.id, v.thumbnail, v.views, v."createdAt", u.username as author_username, u.thumbnail as author_thumbnail
          FROM public."Video" v
          JOIN public."User" u ON v.author_id = u.id
          ORDER BY RANDOM()  
          LIMIT ${limit}
         `);
      },
      getSearch: async (_parent: any, { search }: { search: string }, context: Context) => {
         return await context.prisma.video.findMany({
            where: {
               OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  {
                     author: {
                        OR: [{ username: { contains: search, mode: 'insensitive' } }],
                     },
                  },
                  {
                     tags: {
                        some: {
                           OR: [{ name: { contains: search, mode: 'insensitive' } }],
                        },
                     },
                  },
               ],
            },
         });
      },
   },

   Mutation: {
      createVideo: async (_parent: any, { title, description, thumbnail, url, tags, author_id }: VideoTagStringArray, context: Context) => {
         try {
            const video = await context.prisma.video.create({
               data: {
                  title,
                  description,
                  thumbnail,
                  url,
                  author_id,
                  tags: {
                     /* 1+ tags */
                     create: tags.map((tag) => ({ name: tag })),
                  },
               },
            });

            return {
               message: 'Video created successfully',
               video,
            };
         } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
         }
      },

      deleteVideo: async (_parent: any, { id }: { id: number }, context: Context) => {
         try {
            await context.prisma.video.delete({
               where: {
                  id,
               },
            });
            return 'Video deleted successfully';
         } catch (error) {
            throw new Error('Video not found');
         }
      },

      updateVideo: async (_parent: any, { id, title, description, thumbnail, tags }: VideoTagStringArray, context: Context) => {
         const foundVideoTags = await context.prisma.video.findUnique({
            where: {
               id,
            },
            select: {
               tags: {
                  select: {
                     name: true,
                  },
               },
            },
         });

         if (!foundVideoTags) throw new Error(`Video with id: ${id} not found`);

         await context.prisma.video.update({
            where: {
               id,
            },
            data: {
               title,
               description,
               thumbnail,
               /* Delete all tags */
               tags: {
                  deleteMany: {},
               },
            },
         });

         await context.prisma.video.update({
            where: {
               id,
            },
            data: {
               tags: {
                  create: tags.map((tag) => ({ name: tag })),
               },
            },
         });

         return 'Successful Update';
      },

      likeVideo: async (_parent: any, { videoId, userId }: { videoId: number; userId: number }, context: Context) => {
         try {
            await context.prisma.video.update({
               where: {
                  id: videoId,
               },
               data: {
                  likes: {
                     connect: {
                        id: userId,
                     },
                  },
               },
            });
            return true;
         } catch (error) {
            throw new Error('Video not found');
         }
      },

      unlikeVideo: async (_parent: any, { videoId, userId }: { videoId: number; userId: number }, context: Context) => {
         try {
            await context.prisma.video.update({
               where: {
                  id: videoId,
               },
               data: {
                  likes: {
                     disconnect: {
                        id: userId,
                     },
                  },
               },
            });
            return true;
         } catch (error) {
            throw new Error('Video not found');
         }
      },
   },

   Video: {
      author: async (video: Video, _args: any, context: Context) => {
         return await context.prisma.user.findUnique({
            where: {
               id: video.author_id,
            },
         });
      },
      likes: async (parent: Video, _args: any, context: Context) => {
         return await context.prisma.user.findMany({
            where: {
               likedVideos: {
                  some: {
                     id: parent.id,
                  },
               },
            },
         });
      },

      tags: async (parent: Video, _args: any, context: Context) => {
         return await context.prisma.tag.findMany({
            where: {
               video_id: parent.id,
            },
         });
      },
   },
};
