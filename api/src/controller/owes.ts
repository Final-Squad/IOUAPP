import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { getAllOwes, createDebtCard } from "../service/owes";

const owesRoutes: Router = Router();

owesRoutes.route('/')
  .get((req: Request, res: Response) => getAllOwes(req, res))
  .post(body('to').isEmail(), body('from').isEmail(), body('for').exists(), body('amount').exists(),
    (req: Request, res: Response) => createDebtCard(req, res))

export default owesRoutes;
