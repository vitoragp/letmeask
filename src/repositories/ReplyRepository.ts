import { RepositoryBase } from ".";
import { Reply } from "../models/Reply";

import { database } from "../services/firebase";

/***
 * ReplyRepository
 */

export class ReplyRepository implements RepositoryBase<Reply> {
  __roomId: string;
  __questionId: string;

  constructor(roomId: string, questionId: string) {
    this.__roomId = roomId;
    this.__questionId = questionId;
  }

  get(id: string): Promise<Reply> {
    return new Promise<Reply>((resolve, reject) => {
      database
        .ref(
          `/rooms/${this.__roomId}/questions/${this.__questionId}/replies/${id}`
        )
        .get()
        .then((response) => {
          if (response.exists()) {
            resolve({
              id: response.key,
              authorName: response.child("authorName").val(),
              authorId: response.child("authorId").val(),
              authorAvatar: response.child("authorAvatar").val(),
              body: response.child("body").val(),
            });
          } else {
            resolve(null);
          }
        });
    });
  }

  getAll(): Promise<Reply[]> {
    return new Promise<Reply[]>((resolve, reject) => {
      database
        .ref(`/rooms/${this.__roomId}/questions/${this.__questionId}/replies`)
        .get()
        .then((response) => {
          const replies: Reply[] = [];

          if (response.exists()) {
            response.forEach((reply) => {
              replies.push({
                id: reply.key,
                authorName: reply.child("authorName").val(),
                authorId: reply.child("authorId").val(),
                authorAvatar: reply.child("authorAvatar").val(),
                body: reply.child("body").val(),
              });
            });

            resolve(replies);
          } else {
            resolve(null);
          }
        });
    });
  }

  create(obj: Reply): Promise<Reply> {
    return new Promise<Reply>((resolve) => {
      const room = database
        .ref(`/rooms/${this.__roomId}/questions/${this.__questionId}/replies`)
        .push(obj);
      resolve({ ...obj, id: room.key });
    });
  }

  update(obj: Reply): Promise<Reply> {
    const newObject = Object.assign({}, obj);

    // Remove chaves desnecessarias.
    delete newObject.id;

    return new Promise<Reply>((resolve, reject) => {
      database
        .ref(
          `/rooms/${this.__roomId}/questions/${this.__questionId}/replies/${obj.id}`
        )
        .update(newObject)
        .then(() => {
          resolve(obj);
        });
    });
  }

  delete(obj: Reply): Promise<void> {
    return database
      .ref(
        `/rooms/${this.__roomId}/questions/${this.__questionId}/replies/${obj.id}`
      )
      .remove();
  }
}
