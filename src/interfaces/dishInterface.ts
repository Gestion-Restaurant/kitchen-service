import { Document } from 'mongoose';

interface IDish extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    restaurantId: string;
}

export default IDish;