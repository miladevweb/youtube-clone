import { gql } from '@apollo/client';
import { Context } from '../route';
import { Tag } from '@/interfaces/interface';

export const typeDefs = gql`
   type Tag {
      id: String
      name: String
      video: String
   }
`;

export const resolvers = {
   Tag: {
      video: async (parent: Tag, _args: any, context: Context) => {
         await context.prisma.video.findUnique({
            where: {
               id: parent.video_id,
            },
         });
      },
   },
};
