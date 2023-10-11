import Image from 'next/image';
import { uploadFile } from '@/firebase/config';
import { ChangeEvent, MutableRefObject, useRef } from 'react';

type Props = {
   setPrevThumbnailCallback: (newPrev: string | undefined) => void;
   prevThumbnail: string | undefined;
   thumbnailURL: MutableRefObject<string>;
};

export const ThumbnailEdit = ({ setPrevThumbnailCallback, prevThumbnail, thumbnailURL }: Props) => {
   const input = useRef<HTMLInputElement>(null);

   const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const url = await uploadFile(e.target.files[0], localStorage.getItem('username')!);
         thumbnailURL.current = url;

         const prev = URL.createObjectURL(e.target.files[0]);
         setPrevThumbnailCallback(prev);
      }
   };

   return (
      <>
         <input
            type="file"
            name="thumbnail"
            ref={input}
            className="hidden"
            onChange={handleFile}
         />

         {prevThumbnail ? (
            <div
               className="relative w-64 h-32 my-6"
               onClick={() => input.current?.click()}
            >
               <Image
                  src={prevThumbnail}
                  alt="Thumbnail"
                  fill
                  className="object-cover rounded-md cursor-pointer"
               />
            </div>
         ) : (
            <div
               className="w-64 h-32 border border-gray-600 text-gray-500 my-6 cursor-pointer flex justify-center items-center"
               onClick={() => input.current?.click()}
            >
               <span>Thumbnail</span>
            </div>
         )}
      </>
   );
};
