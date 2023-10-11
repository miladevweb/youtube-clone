export type User = {
   id: number;
   username: string;
   email: string;
   thumbnail: string;
   videos: Video[];
   likedVideos: Video[];
   profile: Profile;
   followers: Profile[];
};

export type Video = {
   id: number;
   title: string;
   description: string;
   views: number;
   thumbnail: string;
   url: string;
   createdAt: string;
   updatedAt: string;
   author: User;
   author_id: number;
   likes: User[];
   tags: Tag[];
};

export type Tag = {
   id: string;
   name: string;
   video: Video;
   video_id: number;
};

export type Profile = {
   id: number;
   profile_username: string;
   user: User;
   user_id: number;
   following: User[];
};

export type VideoTagStringArray = Omit<Video, 'tags'> & { tags: string[] };
export type AllVideos = Video & { author_username: string; author_thumbnail: string };
