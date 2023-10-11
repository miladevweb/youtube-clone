import { MyVideos } from '@/components/Videos/MyVideos';

function MyVideosPage() {
   return (
      <>
         <div className="mt-16 w-full px-16">
            <h1 className="text-[80px] font-black">My videos:</h1>
            <MyVideos />
         </div>
      </>
   );
}

export default MyVideosPage;
