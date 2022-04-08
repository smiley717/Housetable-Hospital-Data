# Hospital Data API

Benjamin's Housetable Network Hospital Data API

## NPM Setup

Run `yarn install` in root directory

## Environment

Copy the following into a `.env` file:

```
SESSION_SECRET=secret
DATABASE_URL=postgres://housetable_server:server@localhost:5432/housetable_hospital
```


## Database (Development)

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Run `psql --file=./sql/setup.sql`
3. Run `npx sequelize db:migrate`

## Backend

To start the backend:

1. Run `cd server`
2. Run `yarn start`
