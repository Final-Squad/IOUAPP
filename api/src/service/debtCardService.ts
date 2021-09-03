import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User, { DebtCard } from "../types/common-interfaces";
import DebtCardDAO from "../dao/debtCardDAO";
import UserDAO from "../dao/userDAO";
import { ObjectId } from "mongoose";
const logger = require("../../logger/logger");

export default class DebtCardService {
  debtCardDAO: DebtCardDAO;
  userDAO: UserDAO;

  constructor(debtCardDAO: DebtCardDAO, userDAO: UserDAO) {
    this.debtCardDAO = debtCardDAO;
    this.userDAO = userDAO;
  }

  async getAllDebtCards(req: Request, res: Response): Promise<Response> {
    const debtCards: DebtCard[] | null = await this.debtCardDAO.allDebtCards();
    if (debtCards) {
      const _debtCards: any[] = [];
      debtCards.forEach((card) => _debtCards.push(DebtCardService.jsonifyDebtCard(card)));
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
      for: req.body.for,
      amount: req.body.amount,
    }

    const debtCard = await this.debtCardDAO.createDebtCard(reqDebtCard);
    if (debtCard) {
      logger.info({
        message:
          process.env.NODE_ENV === "development"
            ? DebtCardService.jsonifyDebtCard(debtCard, false)
            : "created a new debtCard",
        debtCard: DebtCardService.jsonifyDebtCard(debtCard),
        service: "service/debtCardService -> createDebtCard",
        environment: process.env.NODE_ENV,
      });
      this.addToPayerOrReceiverBuffer(debtCard);
      return res.status(201).json({ debtCard: DebtCardService.jsonifyDebtCard(debtCard) });
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

  public static jsonifyDebtCard(debtCard: DebtCard, json: boolean = true) {
    const data = {
      id: String(debtCard._id),
      payer: debtCard.payer,
      receiver: debtCard.receiver,
      reason: debtCard.reason,
      amount: debtCard.amount,
      paid: debtCard.paid,
    };
    return !json ? JSON.stringify(data) : data;
  }

}
