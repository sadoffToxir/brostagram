export interface User {
  username: string;
  email: string;
  bio: string;
  userId?: string;
  password?: string;
  isFollowed?: boolean;
  profileImage: string;
  followersCount: number;
  followingCount: number;
  createdAt: Date;
}
