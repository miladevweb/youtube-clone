import { uploadFile } from '@/firebase/config';
import Image from 'next/image';
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';

export const Thumbnail = ({ thumbnailURL }: { thumbnailURL: MutableRefObject<string> }) => {
   const input = useRef<HTMLInputElement>(null);
   const [prevThumbnail, setPrevThumbnail] = useState<string>();

   const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const url = await uploadFile(e.target.files[0], localStorage.getItem('username')!);
         thumbnailURL.current = url;

         const prev = URL.createObjectURL(e.target.files[0]);
         setPrevThumbnail(prev);
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
