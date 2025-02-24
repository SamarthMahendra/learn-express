// quiz/readUsers.ts
import { Router, Request, Response } from 'express';
import { User } from './types';

const router = Router();

/**
 * A function that reads the user data from the file
 */
router.get('/usernames', (req: Request, res: Response) => {
    const users: User[] = (req as any).users;
    if (!users) {
        return res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
    const usernames = users.map(user => ({ id: user.id, username: user.username }));
    res.json(usernames);
});

// GET /read/username/:name — returns the email for a given username
/**
 * A function that reads the user data from the file
 */
router.get('/username/:name', (req: Request, res: Response) => {
    const users: User[] = (req as any).users;
    if (!users) {
        return res.status(404).json({ error: { message: 'Users not found', status: 404 } });
    }
    const username = req.params.name;
    const user = users.find(u => u.username === username);
    if (user) {
        res.json({ email: user.email });
    } else {
        res.status(404).json({ error: { message: 'User not found', status: 404 } });
    }
});

export default router;
