import { RepositoryBase } from ".";
import { Like } from "../models/Like";
import { Question } from "../models/Question";
import { Reply } from "../models/Reply";

import { database } from "../services/firebase";

/***
 * QuestionRepository
 */

export class QuestionRepository implements RepositoryBase<Question> {
  __roomId: string;

  constructor(roomId: string) {
    this.__roomId = roomId;
  }

  get(id: string): Promise<Question> {
    return new Promise<Question>((resolve) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${id}`)
        .get()
        .then((response) => {
          if (response.exists()) {
            const likes: Like[] = [];
            const replies: Reply[] = [];

            response.child("likes").forEach((like) => {
              likes.push({
                id: like.key,
                authorId: like.child("authorId").val(),
              });
            });

            response.child("replies").forEach((reply) => {
              replies.push({
                id: reply.key,
                authorId: reply.child("authorId").val(),
                authorName: reply.child("authorName").val(),
                authorAvatar: reply.child("authorAvatar").val(),
                body: reply.child("body").val(),
              });
            });

            resolve({
              id: response.key,
              body: response.child("body").val(),
              authorAvatar: response.child("authorAvatar").val(),
              authorName: response.child("authorName").val(),
              authorId: response.child("authorId").val(),
              createdAt: response.child("createdAt").val(),
              answered: response.child("answered").val(),
              likeCount: response.child("likeCount").val(),
              likes,
              replies,
            });
          } else {
            resolve(null);
          }
        });
    });
  }

  getAll(): Promise<Question[]> {
    return new Promise<Question[]>((resolve) => {
      database
        .ref(`/rooms/${this.__roomId}/questions`)
        .get()
        .then((response) => {
          const questions: Question[] = [];

          if (response.exists()) {
            response.forEach((question) => {
              const likes: Like[] = [];
              const replies: Reply[] = [];

              question.child("likes").forEach((like) => {
                likes.push({
                  id: like.key,
                  authorId: like.child("authorId").val(),
                });
              });

              question.child("replies").forEach((reply) => {
                replies.push({
                  id: reply.key,
                  authorId: reply.child("authorId").val(),
                  authorName: reply.child("authorName").val(),
                  authorAvatar: reply.child("authorAvatar").val(),
                  body: reply.child("body").val(),
                });
              });

              questions.push({
                id: question.key,
                body: question.child("body").val(),
                authorAvatar: question.child("authorAvatar").val(),
                authorName: question.child("authorName").val(),
                authorId: response.child("authorId").val(),
                createdAt: question.child("createdAt").val(),
                answered: question.child("answered").val(),
                likeCount: question.child("likeCount").val(),
                likes,
                replies,
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
    const newObject = Object.assign({}, obj);

    // Remove chaves desnecessarias.
    delete newObject.likes;
    delete newObject.replies;

    return new Promise<Question>((resolve) => {
      const room = database
        .ref(`/rooms/${this.__roomId}/questions/`)
        .push(newObject);
      resolve({ ...obj, id: room.key });
    });
  }

  update(obj: Question): Promise<Question> {
    const newObject = Object.assign({}, obj);

    // Remove chaves desnecessarias.
    delete newObject.id;
    delete newObject.likes;
    delete newObject.replies;

    return new Promise<Question>((resolve) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${obj.id}`)
        .update(newObject)
        .then(() => {
          resolve(obj);
        });
    });
  }

  delete(obj: Question): Promise<void> {
    return database.ref(`/rooms/${this.__roomId}/questions/${obj.id}`).remove();
  }
}
