import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';

export const Logo = () => {
   return (
      <Link
         href={'/'}
         className="flex items-center"
      >
         <div className="relative">
            <AiFillYoutube className="absolute -bottom-1 text-[35px] text-[hsl(0,100%,57%)]" />
            <span className="bg-white inline-block w-3 h-3 ml-3"></span>
         </div>

         <h3 className="font-bold text-2xl ml-3">
            Milatube <sup className="font-normal text-[12px]">US</sup>
         </h3>
      </Link>
   );
};
