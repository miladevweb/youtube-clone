'use client';
import Loading from '../Loading/my-videos';
import { CardMyVideos } from './CardMyVideos';
import { useSessionData } from '@/hooks/useSessionData';

export const MyVideos = () => {
   const { authData, mutationLoading, queryLoading } = useSessionData();

   if (queryLoading || mutationLoading) return <Loading />;

   if (!authData) return <p>No videos</p>;

   return (
      <div className="w-[70%] grid grid-cols-1 gap-y-6 mx-auto ">
         {authData.videos.map((video) => (
            <CardMyVideos
               key={video.id}
               thumbnail={video.thumbnail}
               title={video.title}
               description={video.description}
               views={video.views}
               createdAt={video.createdAt}
               id={video.id}
            />
         ))}
      </div>
   );
};
