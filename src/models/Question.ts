/***
 * Question
 */

export type Question = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
  answered: boolean;
};
