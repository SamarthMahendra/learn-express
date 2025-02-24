import { promises as fsPromises } from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import readRoutes from './readUsers';
import writeRoutes from './writeUsers';
import { User } from './types';

const app: Express = express();
const port: number = 8000;
const dataFile = '../data/users.json';

let users: User[] = [];

/**
 * A function that reads the user data from the file
 */
async function loadUsers() {
  try {
    const data = await fsPromises.readFile(path.resolve(__dirname, dataFile));
    users = JSON.parse(data.toString());
    console.log('Users loaded successfully');
  } catch (err) {
    console.error('Error loading users file:', err);
  }
}

loadUsers();

/**
 * A middleware function that attaches the users data to the request object
 * @param req  the request object
 * @param res the response object
 * @param next the next middleware function
 */
const attachUsers = (req: Request, res: Response, next: NextFunction) => {
  (req as any).users = users;
  next();
};

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the routers under /read and /write, respectively
app.use('/read', attachUsers, readRoutes);
app.use('/write', attachUsers, writeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
