import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { BiSolidVideoPlus } from 'react-icons/bi';
import { Profile } from './Profile';
import Link from 'next/link';
import { ModeToggle } from '@/components/shadcn/Toggle';
import { signOut } from 'next-auth/react';

const side = 'right';

type Props = {
   thumbnail: string;
   username: string;
};

export const RigthBar = ({ thumbnail, username }: Props) => {
   return (
      <div>
         <Sheet>
            <SheetTrigger asChild>
               <button>
                  <Profile
                     thumbnail={thumbnail}
                     username={username}
                  />
               </button>
            </SheetTrigger>

            <SheetContent
               side={side}
               className="flex flex-col gap-y-6 justify-stretch items-start bg-red-700 dark:bg-background"
            >
               <div className="flex justify-between mt-14 w-full text-white">
                  <span className="text-[17px]">Create a new Video</span>
                  <Link href={'/create'}>
                     <SheetClose asChild={true}>
                        <BiSolidVideoPlus className="text-3xl mr-9" />
                     </SheetClose>
                  </Link>
               </div>

               <div className="flex justify-between">
                  <span className="text-white">Are you sure you want to SIGN OUT?</span>
                  <button
                     className="dark:text-red-500 text-lg border-2 text-white border-white dark:border-red-500 px-2 py-1 font-semibold w-28"
                     onClick={() => {
                        localStorage.removeItem('username');
                        localStorage.removeItem('thumbnail');
                        localStorage.removeItem('userId');
                        localStorage.removeItem('profileId');
                        signOut();
                     }}
                  >
                     YES
                  </button>
               </div>

               <ModeToggle />
            </SheetContent>
         </Sheet>
      </div>
   );
};
