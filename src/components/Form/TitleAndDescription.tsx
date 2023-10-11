export const TitleAndDescription = ({ text }: { text: string }) => {
   return (
      <>
         <h1 className="text-7xl font-black my-6">{text}</h1>

         {/* Title */}
         <label
            htmlFor="title"
            className="label"
         >
            Title:
         </label>
         <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            autoFocus
            className="input"
         />

         {/* Description */}
         <label
            htmlFor="description"
            className="label mt-6"
         >
            Description:
         </label>
         <textarea
            id="description"
            className="input resize-none"
            rows={5}
            placeholder="Description"
            name="description"
         />
      </>
   );
};
