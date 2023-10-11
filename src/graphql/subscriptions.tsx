import { gql } from '@apollo/client';

export const ADD_SUB = gql`
   mutation ($userId: Int!, $profileId: Int!) {
      addFollow(userId: $userId, profileId: $profileId)
   }
`;

export const REMOVE_SUB = gql`
   mutation ($userId: Int!, $profileId: Int!) {
      removeFollow(userId: $userId, profileId: $profileId)
   }
`;
