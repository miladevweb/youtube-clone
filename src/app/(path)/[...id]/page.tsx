import { VideoId } from '@/components/Videos/VideoId';

function VideoPage({ params }: { params: { id: string } }) {
   const { id } = params;
   return <VideoId id={parseInt(id)} />;
}

export default VideoPage;
