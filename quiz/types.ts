// quiz/types.cs
import { Request } from 'express';

/**
 * A type that represents a user object
 */
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface UserRequest extends Request {
    users?: User[];
}
