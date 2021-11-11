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
const ecosystem = require('../ecosystem.config.js');
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = require("./lib/db");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
// app.use(noCache())
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.json({ limit: '2mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname + '/www'));
//라우트 설정
const routers_1 = __importDefault(require("./routers"));
app.use('/api', routers_1.default);
const server = http_1.default.createServer(app);
const port = process.env.PORT || ecosystem.port;
{
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.mongoDB.connect();
        server.listen(port, () => {
            console.log(process.env.NODE_ENV ? 'production' : 'development');
            console.log(`Listening on port ${port}`);
        });
    }))();
}
