import { ADD_LIKE, REMOVE_LIKE } from '@/graphql/likes';
import { useMutation } from '@apollo/client';

export const useLikes = () => {
   const [add] = useMutation(ADD_LIKE);
   const [remove] = useMutation(REMOVE_LIKE);
   return { add, remove };
};
