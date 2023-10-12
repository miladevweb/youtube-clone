'use client';
import { useEditVideo } from '@/hooks/useEditVideo';
import { ThumbnailEdit } from '../Form/ThumbnailEdit';
import { FormEvent, useRef } from 'react';
import { Button } from '../Form/Button';
import { TagsEdit } from '../Form/TagsEdit';
import { useMutation } from '@apollo/client';
import { UPDATE_VIDEO } from '@/graphql/video';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { GET_USER } from '@/graphql/user';
import { DeleteVideo } from './DeleteVideo';

type MutationProps = {
   updateVideo: string;
};

export const EditVideo = ({ id }: { id: number }) => {
   const router = useRouter();
   const thumbnailURL = useRef('');
   const { prevThumbnail, setPrevThumbnailCallback, titleAndDescription, setTitleAndDescriptionCallback, tags, setTagsCallback } = useEditVideo(id);

   const [update, { loading: updateLoading }] = useMutation<MutationProps>(UPDATE_VIDEO, {
      onCompleted: (data) => {
         toast.dismiss();
         toast.success(data.updateVideo, { duration: 2000 });
         setTimeout(() => {
            router.push('/my-videos');
         }, 2500);
      },
      onError: () => {
         toast.dismiss();
         toast.error('Something went wrong!!!', { duration: 2000 });
         setTimeout(() => {
            router.push('/');
         }, 2500);
      },
      /* Refetch data */
      refetchQueries: [
         {
            query: GET_USER,
            variables: {
               username: localStorage.getItem('username'),
            },
         },
      ],
   });

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      update({
         variables: {
            updateVideoId: id,
            title: titleAndDescription.title,
            description: titleAndDescription.description,
            thumbnail: thumbnailURL.current,
            tags,
         },
      });
   };

   if (updateLoading) toast.loading('Updating video...');

   return (
      <div className="mt-16 w-full">
         <form
            autoComplete="off"
            className="flex flex-col w-3/4 relative mx-auto"
            onSubmit={handleSubmit}
         >
            <h1 className="text-7xl font-black my-6">Edit here...</h1>

            {/* Title */}
            <label
               htmlFor="title"
               className="label"
            >
               Title:
            </label>
            <input
               type="text"
               className="input"
               name="title"
               id="title"
               placeholder="Title"
               value={titleAndDescription.title}
               onChange={(e) => setTitleAndDescriptionCallback({ ...titleAndDescription, title: e.target.value })}
               autoFocus
            />

            {/* Description */}
            <label
               htmlFor="description"
               className="label"
            >
               Description:
            </label>
            <textarea
               rows={5}
               className="input"
               name="description"
               id="description"
               placeholder="Description"
               value={titleAndDescription.description}
               onChange={(e) => setTitleAndDescriptionCallback({ ...titleAndDescription, description: e.target.value })}
            />

            <ThumbnailEdit
               prevThumbnail={prevThumbnail}
               setPrevThumbnailCallback={setPrevThumbnailCallback}
               thumbnailURL={thumbnailURL}
            />

            <DeleteVideo
               id={id}
               router={router}
            />

            <Button />
         </form>

         <TagsEdit
            tags={tags}
            setTagsCallback={setTagsCallback}
         />
         <Toaster />
      </div>
   );
};
