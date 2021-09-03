import User, { DebtCard } from "../types/common-interfaces";

export const jsonifyDebtCard = (debtCard: DebtCard, json: boolean = true) => {
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

export const debtCardList = (debtCards: DebtCard[]): DebtCard[] => {
  const _debtCards: any[] = [];
  debtCards.forEach((card) => _debtCards.push(jsonifyDebtCard(card)));
  return _debtCards;
}

export const jsonifyUser = (user: User, json: boolean = true): any => {
  const data = {
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    email: user.email || null,
  };
  return !json ? JSON.stringify(data) : data;
}