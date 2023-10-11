import { KeyboardEvent, RefObject } from 'react';

type Props = {
   handleAddTag: (e: KeyboardEvent<HTMLInputElement>) => void;
   tags: string[];
   tagTextRef: RefObject<HTMLInputElement>;
   handleRemoveTag: (index: number) => void;
};

export const Tags = ({ handleAddTag, tags, tagTextRef, handleRemoveTag }: Props) => {
   return (
      <>
         <label htmlFor="tags"></label>
         <input
            id="tags"
            name="tags"
            type="text"
            className="bg-transparent outline-none placeholder:text-gray-500 border border-gray-600 ml-[216px] w-[500px] pl-4 "
            placeholder="Add a tag"
            onKeyDown={handleAddTag}
            ref={tagTextRef}
         />

         <div className="w-[500px] h-[200px] border border-gray-600 ml-[216px] overflow-y-auto relative bg-transparent">
            <div className="flex flex-wrap gap-2 absolute top-5 px-2">
               {tags.map((tag, index) => (
                  <div
                     className="tag"
                     key={index}
                     onClick={() => handleRemoveTag(index)}
                  >
                     {tag}
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
