import { Router, Request, Response } from "express";
import { body } from 'express-validator';

import { allUsers, createUser, deleteUser, getUser } from "../service/users";

const userRoutes: Router = Router();

userRoutes.route('/')
  .get((req: Request, res: Response) => allUsers(req, res))
  .post(body('firstName').exists(), body('lastName').exists(), body('email').isEmail(),
    (req: Request, res: Response) => createUser(req, res))

userRoutes.route('/:user_email')
  .get((req: Request, res: Response) => getUser(req, res))
  .delete((req: Request, res: Response) => deleteUser(req, res));

export default userRoutes;
