import { Router, Request, Response } from "express";
import { body } from "express-validator";
import DebtCardService from "../service/debtCardService";

const debtCardRoutes: Router = Router();
const debtCardService: DebtCardService = new DebtCardService();

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
