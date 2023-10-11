'use client';
import { GET_SEARCH } from '@/graphql/video';
import { useQuery } from '@apollo/client';
import { Channel } from './Videos/Components/Channel';
import Link from 'next/link';
import { CardDetailVideo } from './Videos/CardDetailVideo';
import { useState } from 'react';
import { Video } from '@/interfaces/interface';

type QueryProps = {
   getSearch: Video[];
};

export const GamingComponent = () => {
   const [videos, setVideos] = useState<Video[]>([]);
   const { loading } = useQuery<QueryProps>(GET_SEARCH, {
      variables: {
         search: 'gaming',
      },
      onCompleted: (data) => {
         setVideos(data.getSearch);
      },
   });

   if (loading) return <p className="mt-20 w-fit mx-auto">Loading...</p>;
   if (videos.length === 0) return <p className="mt-28 text-xl opacity-70 mx-auto w-fit">No results found</p>;
   return (
      <>
         <h2 className="mt-24 ml-60 mb-5 text-xl font-semibold opacity-70">Results: </h2>
         <section className="pb-20">
            <div className="grid grid-cols-1 w-3/5 mx-auto gap-y-10">
               {videos.map((video) => (
                  <div
                     className="relative"
                     key={video.id}
                  >
                     <div className="absolute top-[15%] right-0 z-10 translate-x-[50%] ">
                        <Channel
                           thumbnail={video.author.thumbnail}
                           username={video.author.username}
                        />
                     </div>

                     <Link href={`/${video.id}`}>
                        <div className="hover:scale-110 duration-300">
                           <CardDetailVideo
                              createdAt={video.createdAt}
                              description={video.description}
                              thumbnail={video.thumbnail}
                              title={video.title}
                              views={video.views}
                           />
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </section>
      </>
   );
};
