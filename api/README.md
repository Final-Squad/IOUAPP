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
- **Architecture → Model Service Controller**
    - **api** → root directory
        - **dist** → build
        - **logger** → save custom logs
        - **src** → main entry

            Flow |- model → db.ts → service → controller → app.ts

            - controller
            - db.ts → database connection and logic |- should be tested
            - model → in the form of MongoDB (Schema) documents
            - service → should be tested
            - types
            - app.ts → application main file

## Routes

[ GET ] Home ' / ' route redirects to ' /healthcheck ' → for checking API's current status

[ GET | POST ] ' users/ ' → get all users | create new user

```tsx
schema = {
  firstName: string,
  lastName: string,
  email: string
}
```

[ GET | DELETE ] ' users/ user_email' → get and delete user by user's email

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
