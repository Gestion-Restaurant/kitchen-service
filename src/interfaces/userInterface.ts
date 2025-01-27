import { Document, Types } from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'client' | 'chef' | 'delivery';
    sessionToken: string;
    verified: boolean;
}

export default IUser;