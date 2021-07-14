/***
 * Question
 */

import { Like } from "./Like";

export type Question = {
  id?: string;
  body: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  answered: boolean;
  likeCount: number;
  likes: Like[];
};
