import { useRef, useState, KeyboardEvent } from 'react';

export const useTags = () => {
   const [tags, setTags] = useState<string[]>([]);
   const tagTextRef = useRef<HTMLInputElement>(null);

   const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         if (tagTextRef.current) {
            if (tagTextRef.current.value.trim() !== '') {
               setTags([...tags, tagTextRef.current.value]);
               tagTextRef.current.value = '';
            }
         }
      }
   };

   const handleRemoveTag = (index: number) => {
      const copyTags = [...tags];
      copyTags.splice(index, 1); /* posicion, delete 1, 2 ,3 ... */
      setTags(copyTags);
   };

   return { handleAddTag, tags, tagTextRef, handleRemoveTag };
};
