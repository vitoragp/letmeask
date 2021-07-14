import { RepositoryBase } from ".";
import { Like } from "../models/Like";

import { firebase, database } from "../services/firebase";

/***
 * LikeRepository
 */

export class LikeRepository implements RepositoryBase<Like> {
  __roomId: string;
  __questionId: string;

  constructor(roomId: string, questionId: string) {
    this.__roomId = roomId;
    this.__questionId = questionId;
  }

  get(id: string): Promise<Like> {
    return new Promise<Like>((resolve, reject) => {
      database
        .ref(
          `/rooms/${this.__roomId}/questions/${this.__questionId}/likes/${id}`
        )
        .get()
        .then((response) => {
          if (response.exists()) {
            resolve({
              id: response.key,
              authorId: response.child("authorId").val(),
            });
          } else {
            resolve(null);
          }
        });
    });
  }

  getAll(): Promise<Like[]> {
    return new Promise<Like[]>((resolve, reject) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${this.__questionId}/likes`)
        .get()
        .then((response) => {
          const questions: Like[] = [];

          if (response.exists()) {
            response.forEach((question) => {
              questions.push({
                id: question.key,
                authorId: question.child("authorId").val(),
              });
            });

            resolve(questions);
          } else {
            resolve(null);
          }
        });
    });
  }

  create(obj: Like): Promise<Like> {
    return new Promise<Like>((resolve) => {
      const room = database
        .ref(`/rooms/${this.__roomId}/questions/${this.__questionId}/likes`)
        .push(obj);
      resolve({ ...obj, id: room.key });
    });
  }

  update(obj: Like): Promise<Like> {
    const newObject = Object.assign({}, obj);

    // Remove chaves desnecessarias.
    delete newObject.id;

    return new Promise<Like>((resolve, reject) => {
      database
        .ref(
          `/rooms/${this.__roomId}/questions/${this.__questionId}/likes/${obj.id}`
        )
        .update(newObject)
        .then(() => {
          resolve(obj);
        });
    });
  }

  delete(obj: Like): Promise<void> {
    return database
      .ref(
        `/rooms/${this.__roomId}/questions/${this.__questionId}/likes/${obj.id}`
      )
      .remove();
  }
}
