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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = __importDefault(require("../config"));
const modules_1 = require("../lib/modules");
class Auth {
    constructor() {
    }
    checkLogin() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let token = ((_a = req.headers['access-token']) === null || _a === void 0 ? void 0 : _a.toString()) || null;
                let dToken = ((_b = req.headers['duplicate']) === null || _b === void 0 ? void 0 : _b.toString()) || '';
                if (token) {
                    const decoded = yield this.tokenVerify(token);
                    if (decoded) {
                        token = this.createToken({
                            _id: new db_1.ObjectID(decoded._id),
                            id: decoded.id,
                            nick: decoded.nick,
                            bankOwner: decoded.bankOwner,
                            grade: decoded.grade,
                            isAgent: decoded.isAgent
                        });
                        res.set('access-token', token);
                        res.set('duplicate', dToken);
                        req.token = token;
                        req.dToken = dToken;
                        req.decoded = {
                            _id: decoded._id,
                            id: decoded.id,
                            nick: decoded.nick,
                            bankOwner: decoded.bankOwner,
                            grade: decoded.grade,
                            isAgent: decoded.isAgent
                        };
                        next();
                    }
                    else {
                        res.set('access-token', '');
                        res.status(401).end();
                    }
                }
                else {
                    res.set('access-token', '');
                    res.status(401).end();
                }
            }
            catch (e) {
                modules_1.logger.error(e);
                res.set('access-token', '');
                res.status(500).end();
            }
        });
    }
    tokenVerify(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(decoded);
            });
        });
    }
    createToken(tokenObject) {
        return jsonwebtoken_1.default.sign(tokenObject, config_1.default.jwtSecret, { expiresIn: config_1.default.expiresIn });
    }
}
exports.default = Auth;
