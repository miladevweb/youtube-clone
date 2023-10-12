import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export const Input = () => {
   const router = useRouter();

   const handleSubmit = (e: FormEvent<HTMLFormElement> | any) => {
      e.preventDefault();
      router.push(`/search/${e.target.elements.search.value}`);
      e.target.elements.search.value = '';
   };
   return (
      <form
         autoComplete="off"
         className="bg-gray-200 dark:bg-gray-800 rounded-[20px] flex items-center px-4 w-[700px] h-10"
         onSubmit={handleSubmit}
      >
         <input
            type="search"
            name="search"
            id="search"
            className="bg-transparent w-full h-full px-1 outline-none"
         />
         <label htmlFor="search">
            <AiOutlineSearch className="text-xl" />
         </label>
      </form>
   );
};
