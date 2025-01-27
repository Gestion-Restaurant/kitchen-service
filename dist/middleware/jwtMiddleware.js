"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddlewareOwner = exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// verify cookies and jwt token
const jwtMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.auth_token;
    if (!token) {
        throw new Error('Unauthorized');
    }
    jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', (err, result) => {
        if (err)
            throw new Error('Unauthorized');
        req.token = result;
        req.body.restaurantId = result.id;
    });
    next();
});
exports.jwtMiddleware = jwtMiddleware;
// verify cookies and jwt token and if the restaurant is the owner of the dish
const jwtMiddlewareOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.auth_token;
    if (!token) {
        throw new Error('Unauthorized');
    }
    jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', (err, result) => {
        if (err)
            throw new Error('Unauthorized');
        if (req.body.restaurantId !== result.id) {
            throw new Error('Unauthorized');
        }
        req.token = result;
        req.body.restaurantId = result.id;
    });
    next();
});
exports.jwtMiddlewareOwner = jwtMiddlewareOwner;
