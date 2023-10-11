'use client';
import { toast, Toaster } from 'sonner';
import { FormEvent, useRef } from 'react';
import { TitleAndDescription } from '../Form/TitleAndDescription';
import { Thumbnail } from '../Form/Thumbnail';
import { Video } from '../Form/Video';
import { Button } from '../Form/Button';
import { Tags } from '../Form/Tags';
import { useTags } from '@/hooks/useTags';
import { useMutation } from '@apollo/client';
import { CREATE_VIDEO } from '@/graphql/video';
import { useRouter } from 'next/navigation';

type MutationProps = {
   createVideo: {
      message: string;
      video: {
         id: number;
      };
   };
};

export const CreateVideo = () => {
   const router = useRouter();
   const videoURL = useRef('');
   const thumbnailURL = useRef('');

   const { handleAddTag, tags, tagTextRef, handleRemoveTag } = useTags();

   const [create, { loading }] = useMutation<MutationProps>(CREATE_VIDEO, {
      onCompleted: (data) => {
         toast.dismiss();
         toast.success(data.createVideo.message, { duration: 2000 });
         setTimeout(() => {
            router.push(`/${data.createVideo.video.id}`);
         }, 2500);
      },
      onError: (error) => {
         toast.dismiss();
         toast.error(error.message, { duration: 2000 });
         setTimeout(() => {
            router.push('/');
         }, 2500);
      },
   });

   const handleSubmit = async (e: FormEvent<HTMLFormElement> | any) => {
      e.preventDefault();
      create({
         variables: {
            title: e.target.elements.title.value,
            thumbnail: thumbnailURL.current,
            url: videoURL.current,
            authorId: JSON.parse(localStorage.getItem('userId')!),
            description: e.target.elements.description.value,
            tags,
         },
      });
   };

   if (loading) toast.loading('Creating video...');

   return (
      <div className="mt-16 w-full">
         <form
            autoComplete="off"
            className="flex flex-col w-3/4 mx-auto relative"
            onSubmit={handleSubmit}
         >
            <TitleAndDescription text="Create a new video here..." />

            <Thumbnail thumbnailURL={thumbnailURL} />

            <Video videoURL={videoURL} />

            <Button />
         </form>

         <Tags
            handleAddTag={handleAddTag}
            tags={tags}
            tagTextRef={tagTextRef}
            handleRemoveTag={handleRemoveTag}
         />
         <Toaster />
      </div>
   );
};
