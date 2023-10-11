const x = [1, 2, 3, 4];
function Loading() {
   return (
      <div className="grid grid-cols-1 gap-y-6 mx-auto w-[70%]">
         {x.map((card) => (
            <div
               className="w-full rounded-sm flex"
               key={card}
            >
               <div className="w-[400px] h-[180px] rounded-md mt-4 loading-animation "></div>

               <div className="px-6">
                  <div className="h-[25px] w-[450px] my-[10px] rounded-md loading-animation"></div>
                  <p className="h-[140px] w-[750px] rounded-md loading-animation"></p>
                  <div className="mt-[6px]">
                     <span className="inline-block w-[90px] h-4 rounded-md loading-animation"></span> <span className="inline-block w-[90px] h-4 rounded-md loading-animation"></span>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

export default Loading;
