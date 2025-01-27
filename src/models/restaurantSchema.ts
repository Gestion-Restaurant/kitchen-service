import mongoose, { Schema } from 'mongoose';
import IRestaurant from '../interfaces/restaurantInterface';

const RestaurantSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
});

export default mongoose.model<IRestaurant>('users', RestaurantSchema);
