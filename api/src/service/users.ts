import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { listOfOwes } from "./owes";
import User from "../types/common-interfaces";
import DB from "../db";
const logger = require('../../logger/logger');

const db = new DB();

export const allUsers = async (req: Request, res: Response) => {
  const users = await db.user.find().then((docs: User[]) => {
    const _users: any = [];
    docs.forEach((user: any) => _users.push(jsonifyUser(user)));
    return _users;
  }).catch((err) => {
    logger.error({
      message: err,
      service: 'service/users -> allUsers',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ error: 'UNABLE to get all users from database' });
  });
  return res.status(200).json({ users_amount: users.length, users: users });
}

export const getUser = async (req: Request, res: Response) => {
  const user = await db.user.findOne({ email: req.params.user_email });
  const messageError = `user with email [ ${ req.params.user_email || null } ] doesn't exist`;
  if (user) {
    logger.info({
      message: jsonifyUser(user, false),
      service: 'service/users -> getUser',
      environment: process.env.NODE_ENV
    });
  } else {
    logger.error({
      message: messageError,
      service: 'service/users -> getUser',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ errors: messageError });
  }
  return res.status(200).json({ message: jsonifyUser(user) });
}

export const createUser = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  db.user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }, (err, result) => {
    if (err) {
      logger.error({
        message: err,
        service: 'service/users -> createUser',
        environment: process.env.NODE_ENV
      });
      return res.status(400).json({ error: 'UNABLE to save to database' });
    }
    logger.info({
      message: process.env.NODE_ENV === 'development' ? jsonifyUser(result, false) : 'created a new user',
      user: jsonifyUser(result),
      service: 'service/users -> createUser',
      environment: process.env.NODE_ENV
    })
    return res.status(201).json({ user: jsonifyUser(result) });
  })
}

export const deleteUser = async (req: Request, res: Response) => {
  const user = await db.user.findOne({ email: req.params.user_email });
  const messageError = `user with email [ ${ req.params.user_email || null } ] doesn't exist`;
  const messageSuccess = `user with email [ ${ req.params.user_email } ] was deleted`;

  if (user) {
    user.remove();
    logger.info({
      message: messageSuccess,
      service: 'service/users -> deleteUser',
      environment: process.env.NODE_ENV
    });
  } else {
    logger.error({
      message: messageError,
      service: 'service/users -> deleteUser',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ errors: messageError });
  }
  return res.status(204).json({ message: messageSuccess });
}

export const jsonifyUser = (user: User, json: boolean = true) => {
  const data = {
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    email: user.email || null,
    owedTo: user.owedTo.length ? listOfOwes(user.owedTo) : [],
    owedFrom: user.owedFrom.length ? listOfOwes(user.owedFrom) : [],
  }
  return !json ? JSON.stringify(data) : data;
}
