# CoderDojo Braga

## Contributing

To run the repository on your computer follow these steps:

1. Copy the contents of `.env.example` and paste them in a new file called `.env`;

2. Start docker;

3. Run the script `start-database.sh` to initialize a database locally. This script will prompt you if you want to set a random password for the database connection;
    - If you don't, you can set a custom one by replacing the word `password` in your `.env` `DATABASE_URL` and then running the script again;
    - If you do, it will create a password, and replace it in the `.env`, it will also create `.env-e` file with the previous version of the `.env` in case something goes wrong, if you do not need this file, you can delete it;

    This script will create the database container and start it;

4. Run `pnpm db:push` to update the database columns;

5. Run `pnpm dev` and your website should be running locally on [`localhost:3000`](http://localhost:3000).
