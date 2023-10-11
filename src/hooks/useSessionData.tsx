import { CREATE_USER, GET_USER } from '@/graphql/user';
import { User } from '@/interfaces/interface';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type QueryProps = {
   getUser: User;
};

type MutationProps = {
   createUser: User;
};

export const useSessionData = () => {
   const { data: session, status } = useSession();
   const [authData, setAuthData] = useState<User>();

   const [signUp, { loading: mutationLoading }] = useMutation<MutationProps>(CREATE_USER, {
      onCompleted: (data) => {
         localStorage.setItem('username', data.createUser.username);
         localStorage.setItem('thumbnail', data.createUser.thumbnail);
         localStorage.setItem('userId', JSON.stringify(data.createUser.id));
         localStorage.setItem('profileId', JSON.stringify(data.createUser.profile.id));

         setAuthData(data.createUser);
      },
   });

   const { loading: queryLoading } = useQuery<QueryProps>(GET_USER, {
      variables: {
         username: session?.user?.name,
      },
      onCompleted: (data) => {
         if (session && session.user && status === 'authenticated') {
            localStorage.setItem('username', session.user.name!);
            localStorage.setItem('thumbnail', session.user.image!);
            localStorage.setItem('userId', JSON.stringify(data.getUser.id));
            localStorage.setItem('profileId', JSON.stringify(data.getUser.profile.id));

            setAuthData(data.getUser);
         }
      },
      onError: (error) => {
         if (session && session.user && status === 'authenticated') {
            signUp({
               variables: {
                  username: session.user.name,
                  email: session.user.email,
                  thumbnail: session.user.image,
               },
            });
         }
         console.log(error);
      },
   });

   return { authData, mutationLoading, queryLoading };
};
