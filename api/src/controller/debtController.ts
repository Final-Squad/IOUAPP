import { Router, Request, Response } from "express";
import { body } from "express-validator";
import DB from "../dao/db";
import DebtCardDAO from "../dao/debtCardDAO";
import UserDAO from "../dao/userDAO";
import DebtCardService from "../service/debtCardService";

const debtCardRoutes: Router = Router();
const db: DB = new DB();
const debtCardService: DebtCardService = new DebtCardService(new DebtCardDAO(db), new UserDAO(db));

debtCardRoutes
  .route("/")
  .get((req: Request, res: Response) => debtCardService.getAllDebtCards(req, res))
  .post(
    body("payer").isEmail(),
    body("receiver").isEmail(),
    body("reason").exists(),
    body("amount").exists(),
    (req: Request, res: Response) => debtCardService.createDebtCard(req, res)
  );
export default debtCardRoutes;
