import { RepositoryBase } from ".";
import { Question } from "../models/Question";

import { firebase, database } from "../services/firebase";

/***
 * QuestionRepository
 */

export class QuestionRepository implements RepositoryBase<Question> {
  __roomId: string;

  constructor(roomId: string) {
    this.__roomId = roomId;
  }

  get(id: string): Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${id}`)
        .get()
        .then((response) => {
          if (response.exists()) {
            resolve({
              id: response.key,
              body: response.child("body").val(),
              authorAvatar: response.child("authorAvatar").val(),
              authorName: response.child("authorName").val(),
              authorId: response.child("authorId").val(),
              createdAt: response.child("createdAt").val(),
              answered: response.child("answered").val(),
              likeCount: response.child("likeCount").val(),
            });
          } else {
            resolve(null);
          }
        });
    });
  }

  getAll(): Promise<Question[]> {
    return new Promise<Question[]>((resolve, reject) => {
      database
        .ref(`/rooms/${this.__roomId}/questions`)
        .get()
        .then((response) => {
          const questions: Question[] = [];

          if (response.exists()) {
            response.forEach((question) => {
              questions.push({
                id: question.key,
                body: question.child("body").val(),
                authorAvatar: question.child("authorAvatar").val(),
                authorName: question.child("authorName").val(),
                authorId: response.child("authorId").val(),
                createdAt: question.child("createdAt").val(),
                answered: question.child("answered").val(),
                likeCount: question.child("likeCount").val(),
              });
            });

            resolve(questions);
          } else {
            resolve(null);
          }
        });
    });
  }

  create(obj: Question): Promise<Question> {
    return new Promise<Question>((resolve) => {
      const room = database.ref(`/rooms/${this.__roomId}/questions/`).push(obj);
      resolve({ ...obj, id: room.key });
    });
  }

  update(obj: Question): Promise<Question> {
    return new Promise<Question>((resolve, reject) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${obj.id}`)
        .update(obj)
        .then(() => {
          resolve(obj);
        });
    });
  }

  delete(obj: Question): Promise<void> {
    return database.ref(`/rooms/${this.__roomId}/questions/${obj.id}`).remove();
  }
}
