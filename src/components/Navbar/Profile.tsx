import Image from 'next/image';

type Props = {
   thumbnail: string;
   username: string;
};

export const Profile = ({ thumbnail, username }: Props) => {
   return (
      <div className="flex items-center cursor-pointer">
         <div className="relative aspect-square w-10 h-10">
            <Image
               src={thumbnail}
               alt="User"
               fill
               loading="lazy"
               placeholder="blur"
               blurDataURL="/blur.svg"
               sizes="(max-width: 40px)100vw"
               className="rounded-full"
            />
         </div>

         <p className="font-normal text-lg ml-3 opacity-80 hover:opacity-100">{username}</p>
      </div>
   );
};
