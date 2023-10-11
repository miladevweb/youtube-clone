import Link from 'next/link';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

type Props = {
   id: number;
   thumbnail: string;
   title: string;
   authorThumbnail: string;
   authorUsername: string;
   createdAt: string;
   views: number;
};

export const CardVideo = ({ id, thumbnail, title, authorThumbnail, authorUsername, createdAt, views }: Props) => {
   const transformCreatedAt = new Date(Number(createdAt));
   const date = formatDistance(transformCreatedAt, Date.now(), { addSuffix: true });
   return (
      <Link
         href={`/${id}`}
         className="min-w-[320px] h-fit"
      >
         <div className="relative w-full h-[160px] aspect-video">
            <Image
               src={thumbnail}
               alt={title}
               fill
               priority
               placeholder="blur"
               blurDataURL="/blur.svg"
               className="object-cover rounded-md hover:scale-105 duration-300 ease-in transition-all"
               sizes="(max-width:320px)100vw"
            />
         </div>

         <div className="flex gap-x-5 mt-3">
            {/* Author Thumbnail */}
            <div className="relative w-10 h-10 aspect-square">
               <Image
                  src={authorThumbnail}
                  alt={authorUsername}
                  fill
                  sizes="(max-width:40px)100vw"
                  className="rounded-full object-cover"
                  loading="lazy"
               />
            </div>

            {/* Info Video */}
            <div>
               <h2 className="font-semibold text-lg">{title}</h2>
               <p className="text-sm opacity-70">{authorUsername}</p>
               <p className="text-sm opacity-70">
                  {views} views • {date}
               </p>
            </div>
         </div>
      </Link>
   );
};
