import { gql } from '@apollo/client';

export const GET_USER = gql`
   query ($username: String!) {
      getUser(username: $username) {
         id
         username
         thumbnail
         videos {
            id
            title
            description
            views
            thumbnail
            createdAt
         }
         profile {
            id
         }
      }
   }
`;

export const CREATE_USER = gql`
   mutation ($username: String!, $email: String!, $thumbnail: String!) {
      createUser(username: $username, email: $email, thumbnail: $thumbnail) {
         id
         username
         thumbnail
         profile {
            id
         }
         videos {
            id
            title
            description
            views
            thumbnail
            createdAt
         }
      }
   }
`;
