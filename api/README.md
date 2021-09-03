# IOUApp - { API }

- **Technologies**
    - GitHub
        - GitHub Secrets
    - NodeJs
    - TypeScript
    - ExpressJS
    - Winston → Logger
    - Auth0
    - MongoDB → using mongoose
- **Architecture → Model DAO Service Controller**
    - **api** → root directory
        - **dist** → build
        - **logger** → custom logs
        - **src** → main entry

            Flow |- model → dao → service → controller → app.ts

            - controller
            - dao → data access object
            - model → in the form of MongoDB (Schema) documents
            - service → should be tested
            - types → interfaces
            - app.ts → application main file - server

## Routes

[ GET ] Home ' / ' route redirects to ' /healthcheck ' → for checking API's current status

[ GET | POST ] ' users/ ' → get all users | create new user

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "doe@gmail.com"
}
```

[ GET | DELETE ] ' users/user_email ' → get and delete user by user's email

[ GET | POST ] ' debtcards/ ' → get all debtcards | create new debtcard

```json
{
  "payer": "john@gmail.com",
  "receiver": "doe@gmail.com",
  "reason": "food & drink",
	"amount": 21.25
}
```

## Installation

```bash
npm i
// development environment
npm run dev
// production environment
npm run start
```

## Contributors

- [matxa](https://github.com/matxa)
- [chriswill88](https://github.com/chriswill88)

## Licence

- ISC
