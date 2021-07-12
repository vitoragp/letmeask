/***
 * Question
 */

export type Question = {
  id?: string;
  body: string;
  authorName: string;
  authorAvatar: string;
  createdAt: Date;
  answered: boolean;
  likes: number;
};
