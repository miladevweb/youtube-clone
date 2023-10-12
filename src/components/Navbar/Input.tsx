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
         className="bg-gray-200 dark:bg-gray-800 rounded-[20px] flex flex-row-reverse items-center px-4 w-[700px] h-10"
         onSubmit={handleSubmit}
      >
         <label htmlFor="search">
            <AiOutlineSearch className="text-xl" />
         </label>

         <input
            type="search"
            id="search"
            name="search"
            className="bg-transparent w-full h-full px-1 outline-none"
         />
      </form>
   );
};
