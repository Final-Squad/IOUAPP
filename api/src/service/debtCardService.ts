import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User, { DebtCard } from "../types/common-interfaces";
import DebtCardDAO from "../dao/debtCardDAO";
import UserDAO from "../dao/userDAO";
import { ObjectId } from "mongoose";
import { jsonifyDebtCard } from "./utils";
const logger = require("../../logger/logger");

export default class DebtCardService {
  debtCardDAO: DebtCardDAO;
  userDAO: UserDAO;

  constructor(debtCardDAO: DebtCardDAO = new DebtCardDAO(), userDAO: UserDAO = new UserDAO()) {
    this.debtCardDAO = debtCardDAO;
    this.userDAO = userDAO;
  }

  async getAllDebtCards(req: Request, res: Response): Promise<Response> {
    const debtCards: DebtCard[] | null = await this.debtCardDAO.allDebtCards();
    if (debtCards) {
      const _debtCards: any[] = [];
      debtCards.forEach((card) => _debtCards.push(jsonifyDebtCard(card)));
      return res.status(200).json({ length: _debtCards.length, debtCards: _debtCards });
    } else {
      return res
        .status(400)
        .json({ error: "UNABLE to get all owes (debt cards) from database" });
    }
  }

  async createDebtCard(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reqDebtCard = {
      payer: req.body.payer,
      receiver: req.body.receiver,
      reason: req.body.reason,
      amount: req.body.amount,
    }

    const debtCard = await this.debtCardDAO.createDebtCard(reqDebtCard);
    if (debtCard) {
      logger.info({
        message:
          process.env.NODE_ENV === "development"
            ? jsonifyDebtCard(debtCard, false)
            : "created a new debtCard",
        debtCard: jsonifyDebtCard(debtCard),
        service: "service/debtCardService -> createDebtCard",
        environment: process.env.NODE_ENV,
      });
      this.addToPayerOrReceiverBuffer(debtCard);
      return res.status(201).json({ debtCard: jsonifyDebtCard(debtCard) });
    } else {
      return res.status(400).json({ error: "UNABLE to save to database" });
    }
  }

  async addToPayerOrReceiverBuffer(debtCard: DebtCard): Promise<void>  {
    try {
      const payer: User | null = await this.userDAO.getUserByEmail(debtCard.payer);
      const receiver: User | null = await this.userDAO.getUserByEmail(debtCard.receiver);

      payer?.toPay.push(debtCard._id);
      receiver?.toReceive.push(debtCard._id);
      payer?.save();
      receiver?.save();
    } catch (err: any) {
      logger.error({
        message: err,
        service: "service/debtCardService -> addToPayerOrReceiverBuffer",
        environment: process.env.NODE_ENV,
      });
    }
  }

  async payDebtCardById(id: ObjectId): Promise<void>  {
    try {
      const debtCard: DebtCard | null = await this.debtCardDAO.getDebtCardById(id);
      if (debtCard) {
        debtCard.paid = true;
        debtCard.save();
      }
    } catch (err) {
      logger.error({
        message: err,
        service: "service/debtCardService -> payDebtCardById",
        environment: process.env.NODE_ENV,
      });
    }
  }

}
