import { gql } from '@apollo/client';

export const FOLLOWERS = gql`
   query ($profileId: Int!) {
      followers(profileId: $profileId) {
         user {
            followers {
               user {
                  thumbnail
                  username
               }
            }
         }
      }
   }
`;

export const SUBS = gql`
   query ($profileId: Int!) {
      subs(profileId: $profileId) {
         following {
            username
            thumbnail
         }
      }
   }
`;
