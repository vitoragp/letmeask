import { RepositoryBase } from ".";
import { Question } from "../models/Question";

import { Room } from "../models/Room";
import { firebase, database } from "../services/firebase";

function createQuestion(question: firebase.database.DataSnapshot): Question {
  return {
    id: question.key,
    body: question.child("body").val(),
    answered: question.child("answered").val(),
    authorName: question.child("authorName").val(),
    authorAvatar: question.child("authorAvatar").val(),
    authorId: question.child("authorId").val(),
    createdAt: question.child("createdAt").val(),
    likeCount: question.child("likeCount").val(),
  };
}

/***
 * RoomRepository
 */

export class RoomRepository implements RepositoryBase<Room> {
  get(id: string): Promise<Room> {
    return new Promise<Room>((resolve, reject) => {
      database
        .ref("/rooms/" + id)
        .get()
        .then((response) => {
          if (response.exists()) {
            const questions: Question[] = [];

            response.child("questions").forEach((question) => {
              questions.push(createQuestion(question));
            });

            resolve({
              id: response.key,
              title: response.child("title").val(),
              authorId: response.child("authorId").val(),
              active: response.child("active").val(),
              questions: questions,
            });
          } else {
            resolve(null);
          }
        });
    });
  }

  getAll(): Promise<Room[]> {
    return new Promise<Room[]>((resolve, reject) => {
      database
        .ref("/rooms")
        .get()
        .then((response) => {
          const rooms: Room[] = [];

          if (response.exists()) {
            response.forEach((room) => {
              const questions: Question[] = [];

              room.child("questions").forEach((question) => {
                questions.push(createQuestion(question));
              });

              rooms.push({
                id: room.key,
                title: room.child("title").val(),
                authorId: room.child("authorId").val(),
                active: room.child("active").val(),
                questions: questions,
              });
            });

            resolve(rooms);
          } else {
            resolve(null);
          }
        });
    });
  }

  create(obj: Room): Promise<Room> {
    return new Promise<Room>((resolve) => {
      const room = database.ref("/rooms").push(obj);
      resolve({ ...obj, id: room.key });
    });
  }

  update(obj: Room): Promise<Room> {
    return new Promise<Room>((resolve, reject) => {
      database
        .ref("/rooms/" + obj.id)
        .update(obj)
        .then(() => {
          resolve(obj);
        });
    });
  }

  delete(obj: Room): Promise<void> {
    return database.ref("/rooms/" + obj.id).remove();
  }
}
