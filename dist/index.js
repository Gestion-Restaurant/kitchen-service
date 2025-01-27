"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const DBMiddleware_1 = require("./middleware/DBMiddleware");
const kitchen_routes_1 = __importDefault(require("./routes/kitchen.routes"));
const dish_routes_1 = __importDefault(require("./routes/dish.routes"));
const corsOptions = {};
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
(0, DBMiddleware_1.mongooseConnect)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
app.use('/restaurants', kitchen_routes_1.default);
app.use('/dishes', dish_routes_1.default);
