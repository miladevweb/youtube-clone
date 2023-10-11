import { signIn } from 'next-auth/react';

export const SignIn = () => {
   return (
      <div>
         <button
            className="text-blue-500 text-lg border-2 border-blue-500 font-semibold px-2 py-1"
            onClick={() => signIn('google', { callbackUrl: '/my-videos' })}
         >
            SIGN IN
         </button>
      </div>
   );
};
