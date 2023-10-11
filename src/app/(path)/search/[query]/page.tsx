import { SearchComponent } from '@/components/SearchComponent';

function SearchPage({ params }: { params: { query: string } }) {
   const { query } = params;
   return <SearchComponent query={query} />;
}

export default SearchPage;
