const cards = [1, 2, 3, 4, 5, 6, 7, 8];

function Loading() {
   return (
      <div className="w-full gap-x-10 gap-y-10 mt-5  px-7 grid grid-cols-4">
         {cards.map((card) => (
            <div
               className="w-[320px] h-fit"
               key={card}
            >
               <div className="w-full h-[160px] rounded-md loading-animation"></div>

               <div className="flex gap-x-5 mt-3">
                  <span className="w-10 h-10 rounded-full inline-block loading-animation"></span>

                  <div className="flex flex-col w-[80%]  gap-y-2">
                     <span className="inline-block w-[70%] h-3 rounded-sm loading-animation"></span>
                     <span className="inline-block w-[70%] h-3 rounded-sm loading-animation"></span>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default Loading;
