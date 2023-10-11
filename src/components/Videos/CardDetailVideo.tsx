import { formatDistance } from 'date-fns';
import Image from 'next/image';

type Props = {
   thumbnail: string;
   title: string;
   description: string;
   views: number;
   createdAt: string;
};

export const CardDetailVideo = ({ thumbnail, title, description, views, createdAt }: Props) => {
   const transformCreatedAt = new Date(Number(createdAt));
   const date = formatDistance(transformCreatedAt, Date.now(), { addSuffix: true });
   return (
      <div className="w-full border border-gray-800 rounded-sm flex">
         {/* Image */}
         <div className="relative min-w-[400px] h-[220px]">
            <Image
               src={thumbnail}
               alt={title}
               fill
               priority
               placeholder="blur"
               blurDataURL="/blur.svg"
               className="object-contain"
               sizes="(max-width: 500px)100vw"
            />
         </div>

         <div className="px-10 py-4 overflow-y-auto">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-[15px] opacity-70 ">{description}</p>
            <div className="opacity-50 text-xs">
               <span>{views} • views </span> <span>{date}</span>
            </div>
         </div>
      </div>
   );
};
