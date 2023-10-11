import { KeyboardEvent, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
   tags: string[];
   setTagsCallback: (newTags: string[]) => void;
};

export const TagsEdit = ({ tags, setTagsCallback }: Props) => {
   const [tagToUpdate, setTagToUpdate] = useState<string>();
   const [indexTag, setIndexTag] = useState<number>();
   const tagTextRef = useRef<HTMLInputElement>(null);

   const handleTextInInput = (tag: string, index: number) => {
      if (tagTextRef.current) {
         tagTextRef.current.value = tag;
         tagTextRef.current.focus();
         setIndexTag(index);
         setTagToUpdate(tag);
      }
   };

   /* Remove */
   const removeTag = (index: number) => {
      const tagsCopy = [...tags];
      tagsCopy.splice(index, 1); /* position, delete */
      setTagsCallback(tagsCopy);
   };

   const submitTags = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         if (tagTextRef.current && tagTextRef.current.value !== '' && tagToUpdate) {
            /* Update */
            const tagsCopy = [...tags];
            tagsCopy.splice(indexTag!, 1, tagTextRef.current.value); /* position, delete, replace */
            setTagsCallback(tagsCopy);

            setTagToUpdate(undefined);
            tagTextRef.current.value = '';
         } else if (tagTextRef.current && tagTextRef.current.value !== '' && !tagToUpdate) {
            /* Add */
            setTagsCallback([...tags, tagTextRef.current.value]);
            tagTextRef.current.value = '';
         }
      }
   };
   return (
      <>
         <label htmlFor="tags"></label>
         <input
            id="tags"
            name="tags"
            type="text"
            className="bg-transparent outline-none placeholder:text-gray-500 border border-gray-600 ml-[216px] w-[500px] pl-4 "
            placeholder="Add a tag"
            onKeyDown={(e) => submitTags(e)}
            ref={tagTextRef}
         />

         <div className="w-[500px] h-[200px] border border-gray-600 ml-[216px] overflow-y-auto relative bg-transparent">
            <div className="flex flex-wrap gap-2 absolute top-5 px-2">
               {tags.map((tag, index) => (
                  <div
                     className="tag"
                     key={index}
                  >
                     <span onClick={() => handleTextInInput(tag, index)}> {tag}</span>

                     <AiOutlineCloseCircle
                        className="text-red-600"
                        onClick={() => removeTag(index)}
                     />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
