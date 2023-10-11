import { AiFillHome } from 'react-icons/ai';
import { MdSubscriptions } from 'react-icons/md';
import { BiSolidVideos } from 'react-icons/bi';
import { IoMdMusicalNote } from 'react-icons/io';
import { SiYoutubegaming } from 'react-icons/si';
import { BsPeopleFill } from 'react-icons/bs';
import Link from 'next/link';

const items = [
   {
      logo: <AiFillHome />,
      text: 'Home',
      url: '/',
   },
   {
      logo: <MdSubscriptions />,
      text: 'Subscriptions',
      url: '/subscriptions',
   },
   {
      logo: <BsPeopleFill />,
      text: 'My Followers',
      url: '/followers',
   },
   {
      logo: <BiSolidVideos />,
      text: 'My Videos',
      url: '/my-videos',
   },
   {
      logo: <IoMdMusicalNote />,
      text: 'Music',
      url: '/music',
   },
   {
      logo: <SiYoutubegaming />,
      text: 'Gaming',
      url: '/gaming',
   },
];

export const LeftBar = () => {
   return (
      <div className="sticky basis-[15%] h-[calc(100vh-64px)] top-16 left-10">
         <ul>
            {items.map((item, index) => (
               <li
                  className="flex items-end gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100"
                  key={index}
               >
                  {item.logo}
                  <Link
                     href={item.url}
                     className="leading-none text-base"
                  >
                     {item.text}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};
