// quiz/writeUsers.ts
import { Router, Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { User } from './types';

const router = Router();
const dataFile = path.resolve(__dirname, '../data/users.json');

/**
 * A function that writes the user data to the file
 */
router.post('/adduser', async (req: Request, res: Response) => {
    const users: User[] = (req as any).users;
    if (!users) {
        return res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }

    const newUser = req.body as User;
    users.push(newUser);

    try {
        await fsPromises.writeFile(dataFile, JSON.stringify(users, null, 2));
        console.log('User Saved');
        res.send('done');
    } catch (err) {
        console.error('Failed to write:', err);
        res.status(500).send('Error saving user');
    }
});

export default router;
