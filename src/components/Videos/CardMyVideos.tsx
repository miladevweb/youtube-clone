import Link from 'next/link';
import { CardDetailVideo } from './CardDetailVideo';
import { AiFillYoutube } from 'react-icons/ai';
import { LuSettings2 } from 'react-icons/lu';

type Props = {
   thumbnail: string;
   title: string;
   description: string;
   views: number;
   createdAt: string;
   id: number;
};

export const CardMyVideos = ({ thumbnail, title, description, views, createdAt, id }: Props) => {
   return (
      <div className="relative overflow-x-hidden card-hidden-parent">
         <CardDetailVideo
            thumbnail={thumbnail}
            title={title}
            description={description}
            createdAt={createdAt}
            views={views}
         />

         <div className="absolute z-10 inset-0 bg-black/70 flex justify-center items-center gap-x-20 card-hidden">
            <Link href={`/${id}`}>
               <div className="w-[200px] h-[200px] flex flex-col justify-center items-center text-white cursor-pointer border border-gray-400 rounded-full p-5 ">
                  <span className="text-3xl font-bold">Watch</span>
                  <AiFillYoutube className="text-7xl" />
               </div>
            </Link>

            <Link href={`/edit/${id}`}>
               <div className="w-[200px] h-[200px] flex flex-col justify-center items-center text-white cursor-pointer border border-gray-400 rounded-full p-5 ">
                  <span className="text-3xl font-bold">Edit</span>
                  <LuSettings2 className="text-7xl" />
               </div>
            </Link>
         </div>
      </div>
   );
};
