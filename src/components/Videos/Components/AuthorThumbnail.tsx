import { useSubs } from '@/context/SubsContext';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {
   thumbnail: string;
   author: string;
   subs: number;
};

export const AuthorThumbnail = ({ thumbnail, author, subs }: Props) => {
   const { subs: subsContext, setSubs } = useSubs();

   useEffect(() => {
      setSubs(subs);
   }, []);
   return (
      <div className="flex gap-x-3">
         {/* Image */}
         <div className="relative w-[40px] h-[40px] ">
            <Image
               src={thumbnail}
               alt={author}
               fill
               className="object-cover cursor-pointer rounded-full"
               loading="lazy"
               sizes="(max-width: 40px)100vw"
            />
         </div>

         {/* Author - Data */}
         <div>
            <h3 className="font-black -mb-2">{author}</h3>
            <span className="text-xs opacity-70">{subsContext} subscribers</span>
         </div>
      </div>
   );
};
