import { RepositoryBase } from ".";
import { Question } from "../models/Question";

import { Room } from "../models/Room";
import { database } from "../services/firebase";

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
              questions.push({
                id: question.key,
                body: question.child("body").val(),
                answered: question.child("answered").val(),
                authorId: question.child("authorId").val(),
                createdAt: question.child("createdAt").val(),
              });
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
                questions.push({
                  id: question.key,
                  body: question.child("body").val(),
                  answered: question.child("answered").val(),
                  authorId: question.child("authorId").val(),
                  createdAt: question.child("createdAt").val(),
                });
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

  update(obj: Room): void {
    database.ref("/rooms/" + obj.id).update(obj);
  }

  delete(obj: Room): void {
    database.ref("/rooms/" + obj.id).remove();
  }
}
