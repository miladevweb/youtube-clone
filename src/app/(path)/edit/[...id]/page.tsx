import { EditVideo } from '@/components/Videos/EditVideo';

function EditVideoPage({ params }: { params: { id: string } }) {
   const { id } = params;

   return <EditVideo id={parseInt(id)} />;
}

export default EditVideoPage;
