import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSubs } from '@/context/SubsContext';
import { BiSolidBellRing } from 'react-icons/bi';
import { Profile } from '@/interfaces/interface';
import { ADD_SUB, REMOVE_SUB } from '@/graphql/subscriptions';

type Props = {
   followers: Profile[];
   videoAuthorId: number;
};

export const Subscribe = ({ followers, videoAuthorId }: Props) => {
   const { setSubs } = useSubs();

   const [amISub, setAmISub] = useState(() => {
      const me = followers.find((follower) => follower.profile_username === localStorage.getItem('username'));

      if (me) return true;
      return false;
   });

   /* Add */
   const [add] = useMutation(ADD_SUB, {
      onCompleted: () => {
         setAmISub(true);
         setSubs((prev) => prev + 1);
      },
   });
   const handleAddSub = () => {
      add({
         variables: {
            userId: videoAuthorId,
            profileId: JSON.parse(localStorage.getItem('profileId')!),
         },
      });
   };

   /* Remove */
   const [remove] = useMutation(REMOVE_SUB, {
      onCompleted: () => {
         setAmISub(false);
         setSubs((prev) => prev - 1);
      },
   });
   const handleRemoveSub = () => {
      remove({
         variables: {
            userId: videoAuthorId,
            profileId: JSON.parse(localStorage.getItem('profileId')!),
         },
      });
   };

   return (
      <button
         className="px-4 py-2 bg-gray-300 rounded-2xl text-black/80 w-fit h-fit"
         onClick={amISub ? handleRemoveSub : handleAddSub}
      >
         {amISub ? (
            <span>
               <BiSolidBellRing className="inline-block mr-2" /> Subscribed
            </span>
         ) : (
            'Subscribe'
         )}
      </button>
   );
};
