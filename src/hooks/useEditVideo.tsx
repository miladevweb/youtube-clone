import { GET_EDIT_VIDEO } from '@/graphql/video';
import { Video } from '@/interfaces/interface';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

type QueryProps = {
   getVideo: Video;
};

type TitleAndDescription = {
   title: string;
   description: string;
};

export const useEditVideo = (id: number) => {
   const { data } = useQuery<QueryProps>(GET_EDIT_VIDEO, {
      variables: {
         getVideoId: id,
      },
   });

   /* Title and Description */
   const [titleAndDescription, setTitleAndDescription] = useState<TitleAndDescription>({
      title: '',
      description: '',
   });
   const setTitleAndDescriptionCallback = useCallback(
      (newTitleDescription: TitleAndDescription) => {
         setTitleAndDescription(newTitleDescription);
      },
      [titleAndDescription]
   );

   /* Thumbnail */
   const [prevThumbnail, setPrevThumbnail] = useState<string>();
   const setPrevThumbnailCallback = useCallback(
      (newPrev: string | undefined) => {
         setPrevThumbnail(newPrev);
      },
      [prevThumbnail]
   );

   /* Tags */
   const [tags, setTags] = useState<string[]>([]);
   const setTagsCallback = useCallback(
      (newTags: string[]) => {
         setTags(newTags);
      },
      [tags]
   );

   useEffect(() => {
      if (data) {
         setTitleAndDescription({
            title: data.getVideo.title,
            description: data.getVideo.description,
         });
         setPrevThumbnail(data.getVideo.thumbnail);

         /* we will extract the names of the tags to our array of strings */
         setTags(data.getVideo.tags.map((tag) => tag.name));
      }
   }, [data]);

   return { prevThumbnail, setPrevThumbnailCallback, titleAndDescription, setTitleAndDescriptionCallback, tags, setTagsCallback };
};
