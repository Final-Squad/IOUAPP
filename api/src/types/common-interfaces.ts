import { Document } from "mongoose";

export default interface User extends Document {
  firstName: string,
  lastName: string,
  email: string,
  owedTo: [Owe], // people the user owes money
  owedFrom: [Owe], // people who owes the user money

}

export interface Owe extends Document {
  to: User,
  from: User,
  for: string,
  amount: number,
  paid: boolean,
}
