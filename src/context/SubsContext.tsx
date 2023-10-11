'use client';
import { useContext, createContext, useState, Dispatch } from 'react';

type Props = {
   subs: number;
   setSubs: Dispatch<React.SetStateAction<number>>;
};

export const SubsContext = createContext<Props | null>(null);

export const SubsProvider = ({ children }: { children: React.ReactNode }) => {
   const [subs, setSubs] = useState(0);
   return <SubsContext.Provider value={{ subs, setSubs }}>{children}</SubsContext.Provider>;
};

export const useSubs = () => {
   const context = useContext(SubsContext);
   if (!context) throw new Error('useSubs must be used within a SubsProvider');
   return context;
};
