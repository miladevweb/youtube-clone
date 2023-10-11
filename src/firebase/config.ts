import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
   apiKey: 'AIzaSyCanVNQC40Ri72UljVpBEZZZTspZd6PpVk',
   authDomain: 'clone-nextjs-988a0.firebaseapp.com',
   projectId: 'clone-nextjs-988a0',
   storageBucket: 'clone-nextjs-988a0.appspot.com',
   messagingSenderId: '84049921217',
   appId: '1:84049921217:web:8a6a4a473b901f2945c040',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, username: string) {
   const storageRef = ref(storage, `/${username}/${Date.now()}`);

   await uploadBytes(storageRef, file);
   const url = await getDownloadURL(storageRef);
   return url;
}
