import { AllVideos } from '@/interfaces/interface';
import { CardVideo } from './CardVideo';
import { useQuery } from '@apollo/client';
import { GET_ALL_VIDEOS } from '@/graphql/video';

type QueryProps = {
   getAllVideos: AllVideos[];
};

export const Recommended = () => {
   const { data } = useQuery<QueryProps>(GET_ALL_VIDEOS, {
      variables: { limit: 5 },
   });
   if (!data) return <p>No videos</p>;

   return (
      <div className="flex flex-col justify-center items-center basis-[20%] gap-y-5 ">
         <h2 className="self-start font-semibold opacity-70 text-lg">Recommended:</h2>

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
