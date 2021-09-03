import { Model, ObjectId } from "mongoose";
import User, { DebtCard } from "../types/common-interfaces";
import DB from "./db";

export default class UserDAO {
  db: DB;
  userDB: Model<User>;
  errMessage: string = 'userDAO -> ';

  constructor(db: DB = new DB()) {
    this.db = db;
    this.userDB = db.user;
  }

  async allUsers(): Promise<User[] | null> {
    const users = await this.userDB
      .find()
      .then((docs: User[]) => {
        return docs;
      })
      .catch((err) => {
        this.db.DAOError(err, this.errMessage + 'allUsers');
        return null;
      });
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userDB.findOne({ email });
    if (user) {
      return user;
    } else {
      this.db.DAOError("user with email doesn't exist", this.errMessage + 'getUserByEmail');
      return null;
    }
  }

  async getUserById(id: ObjectId): Promise<User | null> {
    const user = await this.userDB.findById(id);
    const messageError = `user with _id [ ${id} ] doesn't exist`;
    if (user) {
      return user;
    } else {
      this.db.DAOError(messageError, this.errMessage + 'getUserById');
      return null;
    }
  }

  createUser(reqUser: any): Promise<User | null> {
    const newUser = this.userDB.create(reqUser)
      .then((user) => user)
      .catch((err) => {
          this.db.DAOError(err, this.errMessage + 'createUser');
          return null;
      });
      return newUser;
  }

  async deleteUser(email: string): Promise<boolean> {
    const user = await this.userDB.findOne({ email });
    if (user) {
      user.remove();
      return true;
    } else {
      this.db.DAOError("user with email doesn't exist", this.errMessage + 'deleteUser');
      return false;
    }
  }

}
