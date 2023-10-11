'use client';
import { useSession } from 'next-auth/react';
import { Input } from './Input';
import { Logo } from './Logo';
import { SignIn } from './SignIn';
import { RigthBar } from './RigthBar';

export const Navbar = () => {
   const { data: session } = useSession();
   return (
      <nav className="h-16 w-full fixed top-0 z-50 bg-white dark:bg-background flex justify-between items-center px-10">
         <Logo />
         <Input />
         {session && session.user ? (
            <RigthBar
               thumbnail={session.user.image!}
               username={session.user.name!}
            />
         ) : (
            <SignIn />
         )}
      </nav>
   );
};
