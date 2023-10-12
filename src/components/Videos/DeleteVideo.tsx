import { GET_USER } from '@/graphql/user';
import { DELETE_VIDEO } from '@/graphql/video';
import { useMutation } from '@apollo/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'sonner';

export const DeleteVideo = ({ id, router }: { id: number; router: AppRouterInstance }) => {
   const [deleteVideo] = useMutation(DELETE_VIDEO, {
      onCompleted: (data) => {
         toast.dismiss();
         toast.success(data.deleteVideo, { duration: 2000 });
         setTimeout(() => {
            router.push('/my-videos');
         }, 2500);
      },
      onError: () => {
         toast.dismiss();
         toast.error('Something went wrong!!!', { duration: 2000 });
         setTimeout(() => {
            router.push('/');
         }, 2500);
      },
      refetchQueries: [
         {
            query: GET_USER,
            variables: {
               username: localStorage.getItem('username'),
            },
         },
      ],
   });

   const handleDelete = () => {
      deleteVideo({
         variables: {
            id,
         },
      });
   };

   return (
      <span
         className="absolute top-[50%] right-0 border border-gray-600 rounded-full p-10 cursor-pointer "
         onClick={handleDelete}
      >
         <AiFillDelete className="text-8xl text-red-500" />
      </span>
   );
};
