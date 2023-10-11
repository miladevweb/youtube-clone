'use client';
import Loading from '../Loading/home';
import { CardVideo } from './CardVideo';
import { useQuery } from '@apollo/client';
import { AllVideos } from '@/interfaces/interface';
import { GET_ALL_VIDEOS } from '@/graphql/video';

type QueryProps = {
   getAllVideos: AllVideos[];
};

export const GridVideos = () => {
   const { data, loading, error } = useQuery<QueryProps>(GET_ALL_VIDEOS, {
      variables: { limit: 12 },
   });

   if (loading) return <Loading />;
   if (error) return <p>Error: {error.message}</p>;
   if (!data) return <p>No videos</p>;

   return (
      <div className="basis-[85%] gap-x-10 gap-y-10 mt-5  px-7 grid grid-cols-4">
         {data.getAllVideos.map((video) => (
            <CardVideo
               key={video.id}
               id={video.id}
               thumbnail={video.thumbnail}
               title={video.title}
               authorThumbnail={video.author_thumbnail}
               authorUsername={video.author_username}
               createdAt={video.createdAt}
               views={video.views}
            />
         ))}
      </div>
   );
};
