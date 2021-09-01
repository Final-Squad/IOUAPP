import { Router, Request, Response } from "express";
import User, { Owe } from "../types/common-interfaces";
import DB from "../db";
const logger = require('../../logger/logger');

const db = new DB();

export const jsonifyOwe = (owe: Owe) => {
  return {
    to: owe.to,
    from: owe.from,
    for: owe.for,
    amount: owe.amount,
    paid: owe.paid,
  }
}

export const listOfOwes = (list: [Owe]) => {
  const newList = [];
  list.forEach((item) => newList.push(jsonifyOwe(item)));
}
