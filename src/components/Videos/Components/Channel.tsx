import Image from 'next/image';

type Props = {
   thumbnail: string;
   username: string;
};

export const Channel = ({ thumbnail, username }: Props) => {
   return (
      <div className="flex flex-col items-center">
         <div className="relative w-[150px] h-[150px] ">
            <Image
               src={thumbnail}
               alt={username}
               fill
               loading="lazy"
               sizes="(max-width: 150px) 100vw"
               className="rounded-full object-cover border-2 border-gray-600 dark:border-gray-400/50"
            />
         </div>

         <h3 className="font-semibold text-xl">{username}'s Channel</h3>
      </div>
   );
};
