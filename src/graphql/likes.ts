import { gql } from '@apollo/client';

export const ADD_LIKE = gql`
   mutation ($userId: Int!, $videoId: Int!) {
      likeVideo(userId: $userId, videoId: $videoId)
   }
`;

export const REMOVE_LIKE = gql`
   mutation ($userId: Int!, $videoId: Int!) {
      unlikeVideo(userId: $userId, videoId: $videoId)
   }
`;
