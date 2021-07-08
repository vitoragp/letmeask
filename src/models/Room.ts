import { Question } from "./Question";

export interface Room {
  id?: string;
  title: string;
  authorId: string;
  active: boolean;
  questions?: Question[];
}
