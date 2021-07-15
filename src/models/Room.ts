import { Question } from "./Question";

/***
 * Room
 */

export interface Room {
  id?: string;
  title: string;
  authorId: string;
  active: boolean;
  questions?: Question[];
}
