'use client';
import { GET_VIDEO } from '@/graphql/video';
import { Video } from '@/interfaces/interface';
import { useQuery } from '@apollo/client';
import { AuthorThumbnail } from './Components/AuthorThumbnail';
import { Subscribe } from './Components/Subscribe';
import { Likes } from './Components/Likes';
import { formatDistance } from 'date-fns';
import { Recommended } from './Recommended';

type QueryProps = {
   getVideo: Video;
};

export const VideoId = ({ id }: { id: number }) => {
   const {
      data: video,
      error,
      loading,
   } = useQuery<QueryProps>(GET_VIDEO, {
      variables: {
         getVideoId: id,
      },
   });

   if (loading) return <p>Loading ...</p>;
   if (error) return <p>Error: {error.message}</p>;
   if (!video) return <p>Video not found</p>;

   const transformCreatedAt = new Date(Number(video.getVideo.createdAt));
   const date = formatDistance(transformCreatedAt, Date.now(), { addSuffix: true });

   return (
      <div className="w-full mt-20 px-6 flex justify-around">
         <div className="basis-[70%] min-h-[calc(100vh-80px)] ">
            <video
               muted
               controls
               autoPlay={true}
               className="h-[646px] w-full "
            >
               <source src={video.getVideo.url} />
            </video>

            <h1 className="text-[22px] font-bold my-2 ">{video.getVideo.title}</h1>

            <div className="flex justify-between my-3">
               <div className="flex gap-x-5 items-center">
                  <AuthorThumbnail
                     author={video.getVideo.author.username}
                     thumbnail={video.getVideo.author.thumbnail}
                     subs={video.getVideo.author.followers.length}
                  />
                  <Subscribe
                     followers={video.getVideo.author.followers}
                     videoAuthorId={video.getVideo.author.id}
                  />
               </div>

               {/* Likes */}
               <Likes
                  likes={video.getVideo.likes}
                  videoId={video.getVideo.id}
               />
            </div>

            <div className="text-white/60 bg-gray-800 py-4 px-3 rounded-lg">
               <div>
                  <span>{video.getVideo.views} views •</span>
                  <span> {date}</span>
               </div>

               {video.getVideo.description}
            </div>
         </div>

         <Recommended />
      </div>
   );
};
