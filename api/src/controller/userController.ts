import { Router, Request, Response } from "express";
import { body } from "express-validator";

import UserServive from "../service/userService";
import UserDAO from "../dao/userDAO";
import DB from "../dao/db";

const userRoutes: Router = Router();
const userService = new UserServive(new UserDAO(new DB()));

userRoutes
  .route("/")
  .get((req: Request, res: Response) => userService.getAllUsers(res))
  .post(
    body("firstName").exists(),
    body("lastName").exists(),
    body("email").isEmail(),
    (req: Request, res: Response) => userService.createUser(req, res)
  );

userRoutes
  .route("/:user_email")
  .get((req: Request, res: Response) => userService.getUser(req, res))
  .delete((req: Request, res: Response) => userService.deleteUser(req, res));

export default userRoutes;