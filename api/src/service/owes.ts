import { Router, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { Owe } from "../types/common-interfaces";
import DB from "../db";
import { jsonifyUser } from "./users";
const logger = require('../../logger/logger');

const db = new DB();

export const getAllOwes =  async (req: Request, res: Response) => {
  const owes = await db.owe.find().then((docs: Owe[]) => {
    const _owes: any = [];
    docs.forEach((owe: any) => _owes.push(jsonifyOwe(owe)));
    return _owes;
  }).catch((err) => {
    logger.error({
      message: err,
      service: 'service/owes -> getAllOwes',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ error: 'UNABLE to get all owes (debt cards) from database' });
  });
  return res.status(200).json({ debtAmount: owes.length, debt: owes });
}

/**
 * NEXT DAY REMINDERS
 * [] change all lists in models to use the object reference instead of nesting the object so use [ user._id, owe._id ] instead of [ User ot Owe ]
 * [] remove owe._id anywhere it is referenced when remove an Owe Document
 * [] create route to delete Owe Document by _id owes/owe_id -> get and delete Owe Document
*/

export const createDebtCard = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const to = await db.user.findOne({ email: req.body.to })
  const from = await db.user.findOne({ email: req.body.from })

  if (to && from) {
    db.owe.create({
      to,
      from,
      for: req.body.for,
      amount: req.body.amount,
    }, async (err, result) => {

      if (err) {
        logger.error({
          message: err,
          service: 'service/owes -> createDebtCard',
          environment: process.env.NODE_ENV
        });
        return res.status(400).json({ error: 'UNABLE to save to database' });
      }

      to.owedTo.push(result);
      to.save();
      from.owedFrom.push(result);
      from.save();

      logger.info({
        message: process.env.NODE_ENV === 'development' ? jsonifyOwe(result, false) : 'created a new debtCard',
        user: jsonifyOwe(result),
        service: 'service/owes -> createDebtCard',
        environment: process.env.NODE_ENV
      })
      return res.status(201).json({ user: jsonifyOwe(result) });
    })
  } else if (!to) {
    const message = `user ( receiver ) with email ${ req.body.to } doesn't exist`;
    logger.error({
      message,
      service: 'service/owes -> createDebtCard',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ error: message});
  } else if (!from) {
    const message = `user ( sender ) with email ${ req.body.from } doesn't exist`;
    logger.error({
      message,
      service: 'service/owes -> createDebtCard',
      environment: process.env.NODE_ENV
    });
    return res.status(400).json({ error: message});
  }
}

export const jsonifyOwe = (owe: Owe, json: boolean = true) => {
  const data = {
    to: jsonifyUser(owe.to),
    from: jsonifyUser(owe.from),
    for: owe.for,
    amount: owe.amount,
    paid: owe.paid,
  }
  return !json ? JSON.stringify(data) : data;
}

export const listOfOwes = (list: Owe[]) => {
  const newList = [];
  list.forEach((item) => newList.push(jsonifyOwe(item)));
}
