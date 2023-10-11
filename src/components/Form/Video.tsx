import { storage } from '@/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react';
import { BiSolidVideoPlus } from 'react-icons/bi';
import { Progress } from '@/components/ui/progress';
import { AiFillCheckCircle } from 'react-icons/ai';

export const Video = ({ videoURL }: { videoURL: MutableRefObject<string> }) => {
   const input = useRef<HTMLInputElement>(null);
   const [progressVideo, setProgressVideo] = useState(0);

   const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const storageRef = ref(storage, `/${localStorage.getItem('username')}/${Date.now()}`);
         const uploadVideo = uploadBytesResumable(storageRef, e.target.files[0]);

         uploadVideo.on(
            'state_changed',
            (snapshot) => {
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               setProgressVideo(progress);
            },
            (error) => {
               console.log(error);
            },
            () => {
               getDownloadURL(uploadVideo.snapshot.ref).then((url) => (videoURL.current = url));
            }
         );
      }
   };
   return (
      <>
         <label htmlFor="video"></label>
         <input
            type="file"
            name="video"
            id="video"
            ref={input}
            className="hidden"
            onChange={handleVideo}
         />

         <span
            className="absolute right-0 top-[50%] border border-gray-600 rounded-full p-10 cursor-pointer"
            onClick={() => input.current?.click()}
         >
            {progressVideo === 100 ? <AiFillCheckCircle className="text-8xl text-green-500" /> : <BiSolidVideoPlus className="text-8xl" />}
         </span>

         {progressVideo !== 0 && (
            <Progress
               value={progressVideo}
               className="w-56 absolute -right-6 top-[90%]"
            />
         )}
      </>
   );
};
