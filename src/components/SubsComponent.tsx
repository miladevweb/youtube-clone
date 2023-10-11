'use client';
import { SUBS } from '@/graphql/subs';
import { Profile } from '@/interfaces/interface';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type QueryProps = {
   subs: Profile;
};

export const SubsComponent = () => {
   const [profileId, setProfileId] = useState<number>();

   useEffect(() => {
      setProfileId(JSON.parse(localStorage.getItem('profileId')!));
   }, []);

   const { data, loading } = useQuery<QueryProps>(SUBS, {
      variables: {
         profileId,
      },
   });

   if (loading) return <p className="mt-20 w-fit mx-auto">Loading...</p>;
   if (!data?.subs.following) return <p className="mt-20 w-fit mx-auto">No subs</p>;
   return (
      <div className="w-full mt-20">
         <h1 className="ml-48 text-2xl font-bold opacity-90">Subscriptions:</h1>

         <div className="w-3/4 mx-auto grid grid-cols-4 my-10">
            {data?.subs.following.map((f, i) => {
               return (
                  <div
                     className="flex flex-col items-center"
                     key={i}
                  >
                     <div className="relative w-32 h-32 ">
                        <Image
                           src={f.thumbnail}
                           alt={f.username}
                           fill
                           loading="lazy"
                           sizes="(max-width: 128px)100vw"
                           className="rounded-full object-cover"
                        />
                     </div>

                     <h3 className="text-lg opacity-70 mt-2">{f.username}</h3>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
