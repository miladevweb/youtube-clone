import { typeDefs as userTypeDefs, resolvers as userResolvers } from './user';
import { typeDefs as videoTypeDefs, resolvers as videoResolvers } from './video';
import { typeDefs as tagTypeDefs, resolvers as tagResolvers } from './tag';
import { typeDefs as profileTypeDefs, resolvers as profileResolvers } from './profile';

export const typeDefs = [userTypeDefs, videoTypeDefs, tagTypeDefs, profileTypeDefs];
export const resolvers = [userResolvers, videoResolvers, tagResolvers, profileResolvers];
