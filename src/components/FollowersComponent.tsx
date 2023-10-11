'use client';
import { FOLLOWERS } from '@/graphql/subs';
import { Profile } from '@/interfaces/interface';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type QueryProps = {
   followers: Profile;
};

export const FollowersComponent = () => {
   const [profileId, setProfileId] = useState<number>();
   useEffect(() => {
      setProfileId(JSON.parse(localStorage.getItem('profileId')!));
   }, []);

   const { data, loading } = useQuery<QueryProps>(FOLLOWERS, {
      variables: {
         profileId,
      },
   });

   if (loading) return <p className="mt-20 w-fit mx-auto">Loading...</p>;
   if (!data?.followers.user.followers) return <p className="mt-20 w-fit mx-auto">No subs</p>;

   return (
      <div className="w-full mt-20">
         <h1 className="ml-48 text-2xl font-bold opacity-90">Followers:</h1>

         <div className="w-3/4 mx-auto grid grid-cols-4 my-10">
            {data.followers.user.followers.map((follower, index) => {
               return (
                  <div
                     className="flex flex-col items-center"
                     key={index}
                  >
                     <div className="relative w-32 h-32 ">
                        <Image
                           src={follower.user.thumbnail}
                           alt={follower.user.username}
                           fill
                           loading="lazy"
                           sizes="(max-width: 128px)100vw"
                           className="rounded-full object-cover"
                        />
                     </div>

                     <h3 className="text-lg opacity-70 mt-2">{follower.user.username}</h3>
                  </div>
               );
            })}
         </div>
      </div>
   );
};
