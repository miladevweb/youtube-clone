import { gql } from '@apollo/client';

export const GET_ALL_VIDEOS = gql`
   query ($limit: Int!) {
      getAllVideos(limit: $limit) {
         id
         title
         thumbnail
         views
         createdAt
         author_username
         author_thumbnail
      }
   }
`;

export const CREATE_VIDEO = gql`
   mutation ($title: String!, $thumbnail: String!, $url: String!, $description: String, $tags: [String!], $authorId: Int!) {
      createVideo(title: $title, description: $description, tags: $tags, thumbnail: $thumbnail, url: $url, author_id: $authorId) {
         message
         video {
            id
         }
      }
   }
`;

export const GET_VIDEO = gql`
   query ($getVideoId: Int!) {
      getVideo(id: $getVideoId) {
         id
         title
         description
         url
         views
         createdAt
         author {
            id
            username
            thumbnail
            followers {
               profile_username
            }
         }
         likes {
            username
         }
      }
   }
`;

export const GET_EDIT_VIDEO = gql`
   query ($getVideoId: Int!) {
      getVideo(id: $getVideoId) {
         id
         title
         description
         thumbnail
         tags {
            name
         }
      }
   }
`;

export const UPDATE_VIDEO = gql`
   mutation ($updateVideoId: Int!, $title: String, $description: String, $thumbnail: String, $tags: [String]) {
      updateVideo(id: $updateVideoId, title: $title, description: $description, thumbnail: $thumbnail, tags: $tags)
   }
`;

export const GET_SEARCH = gql`
   query ($search: String!) {
      getSearch(search: $search) {
         id
         title
         description
         thumbnail
         views
         createdAt
         author {
            username
            thumbnail
         }
      }
   }
`;

export const DELETE_VIDEO = gql`
   mutation ($id: Int!) {
      deleteVideo(id: $id)
   }
`;
