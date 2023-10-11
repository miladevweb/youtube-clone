import { useState } from 'react';
import { useLikes } from '@/hooks/useLikes';
import { User } from '@/interfaces/interface';
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

type Props = {
   likes: User[];
   videoId: number;
};

export const Likes = ({ likes, videoId }: Props) => {
   const [likesCount, setLikesCount] = useState(likes.length);

   const [liked, setLiked] = useState(() => {
      const me = likes.find((author) => author.username === localStorage.getItem('username'));
      if (me) return true;
      return false;
   });

   const { add, remove } = useLikes();

   const addLike = () => {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      add({
         variables: {
            userId: JSON.parse(localStorage.getItem('userId')!),
            videoId,
         },
      });
   };
   const removeLike = () => {
      if (likesCount > 0) {
         setLikesCount((prev) => prev - 1);
         setLiked(false);
         remove({
            variables: {
               userId: JSON.parse(localStorage.getItem('userId')!),
               videoId,
            },
         });
      }
   };

   return (
      <div className="mt-2">
         <div className="flex gap-x-4 items-center">
            <div className="flex">
               {liked ? (
                  <AiFillLike className="text-2xl mr-1" />
               ) : (
                  <AiOutlineLike
                     className="text-2xl mr-1 cursor-pointer"
                     onClick={addLike}
                  />
               )}

               <span className="text-[20px]">{likesCount}</span>
            </div>

            {liked || !likesCount ? (
               <AiOutlineDislike
                  onClick={removeLike}
                  className={`text-2xl ${!likesCount ? '' : 'cursor-pointer'}`}
               />
            ) : (
               <AiOutlineDislike className="text-2xl" />
            )}
         </div>
      </div>
   );
};
