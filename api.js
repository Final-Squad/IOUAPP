export const API_URL = 'https://api.iamramos.tech';
export const POST_INFO = (data) => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
}

/**
 * check api status
 * @returns api status
 */
export const healthcheck = async () => {
  const status = await fetch(`${API_URL}/users/login/${email}/${password}`)
    .then((res) => res.status);
  return status;
}

// --- User Routes --- //

/**
 * login user
 * @param {*} email
 * @param {*} password
 * @returns user or error message
 */
export const login = async (email, password) => {
  const data = await fetch(`${API_URL}/users/login/${email}/${password}`)
    .then(res => res.json())
    .then(user => user);
  return data;
}

/**
 * get a list of all users from api
 * @returns all users
 */
export const getAllUsers = async () => {
  const users = await fetch(`${API_URL}/users`)
    .then(res => res.json())
    .then(users => users);
  return users;
}

/**
 * create new user
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} email
 * @param {*} password
 * @returns created user
 */
export const createUser = async (
  firstName, lastName, email, password,
) => {
  const userObj = { firstName, lastName, email, password };
  const user = await fetch(
    `${API_URL}/users`, POST_INFO(userObj)
    ).then(res => res.json())
    .then(_user => _user);
  return user
}

/**
 * get user using email
 * @param {*} email
 * @returns user
 */
export const getUser = async (email) => {
  const data = await fetch(`${API_URL}/users/${email}`)
    .then(res => res.json())
    .then(user => user);
  return data;
}

/**
 * delete user
 * @param {*} email
 * @returns boolean for request status
 */
export const deleteUser = async (email) => {
  const data = await fetch(`${API_URL}/users/${email}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(del => del);
  return data;
}

// --- DebtCard Routes --- //

/**
 * get all debtcards
 * @returns debtcards
 */
export const getAllDebtcards = async () => {
  const debtcards = await fetch(`${API_URL}/debtcards`)
    .then(res => res.json())
    .then(debtcards => debtcards);
  return debtcards;
}

/**
 * create new debtcard
 * @param {*} payer
 * @param {*} receiver
 * @param {*} reason
 * @param {*} amount
 * @returns created debtcard
 */
export const createDebtcard = async (
  payer, receiver, reason, amount
) => {
  const debtcardObj = { payer, receiver, reason, amount };
  const debtcard = await fetch(
    `${API_URL}/debtcards`,
    POST_INFO(debtcardObj)
    ).then(res => res.json())
    .then(debtcard => debtcard)
  return debtcard;
}

/**
 * get debtcard by id
 * @param {*} id
 * @returns debtcard or error if does not exist
 */
export const getDebtcardById = async (id) => {
  const debtcard = await fetch(`${API_URL}/debtcards/${id}`)
    .then(res => res.json())
    .then(debtcard => debtcard);
  return debtcard;
}

/**
 * update payment for debtcard
 * @param {*} id mongo objectId
 * @param {*} isPaid boolean value
 * @returns updated debtcard
 */
export const updatePaymentForDebtcard = async (id, isPaid) => {
  const debtcard = await fetch(`${API_URL}/debtcards/${id}?paid=${isPaid}`, { method: 'PUT' })
    .then(res => res.json())
    .then(debtcard => debtcard);
  return debtcard;
}

/**
 * get all debtcards for user by filtering what the user has to pay or what is owed to the user
 * @param {*} userEmail
 * @param {*} debt can only be payer or receiver
 * @returns debtcards
 */
export const getDebtcardForUserByDebtType = async (userEmail, debt) => {
  // if (debt !== 'payer' || debt !== 'receiver') return null;
  const userDebtcards = await fetch(`${API_URL}/debtcards/users/${userEmail}?debt=${debt}`)
    .then(res => res.json())
    .then(debtcards => debtcards);
  console.log("userDebtcards -> ", userDebtcards);
  return userDebtcards;
}
