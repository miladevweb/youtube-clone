'use client';
import { SessionProvider } from 'next-auth/react';

export const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
   return <SessionProvider>{children}</SessionProvider>;
};
