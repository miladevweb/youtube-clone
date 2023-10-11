import { LeftBar } from '@/components/Navbar/LeftBar';
import { GridVideos } from '@/components/Videos/GridVideos';

function HomePage() {
   return (
      <div className="w-full relative mt-16 flex justify-between">
         <LeftBar />
         <GridVideos />
      </div>
   );
}

export default HomePage;
