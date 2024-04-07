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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    database: 'devweb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.pool = pool;
// Função para inserir um cliente e um pedido usando uma transação
function insertClientePedido() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, rows, clienteId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 10, 11]);
                    return [4 /*yield*/, pool.getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.beginTransaction()];
                case 2:
                    _a.sent();
                    // Inserindo um cliente
                    return [4 /*yield*/, connection.query("INSERT INTO cliente (nome, rg, cpf, telefone) VALUES ('Sophia Pussati', '123456', '123.456.789-10', '(11) 1234-5678')")];
                case 3:
                    // Inserindo um cliente
                    _a.sent();
                    return [4 /*yield*/, connection.query("SELECT LAST_INSERT_ID() AS id")];
                case 4:
                    rows = (_a.sent())[0];
                    clienteId = rows[0].id;
                    // Inserindo um pedido associado ao cliente
                    return [4 /*yield*/, connection.query("INSERT INTO pedido (cliente_id, descricao) VALUES (?, 'Construtora')", [clienteId])];
                case 5:
                    // Inserindo um pedido associado ao cliente
                    _a.sent();
                    // Efetivando a transação
                    return [4 /*yield*/, connection.commit()];
                case 6:
                    // Efetivando a transação
                    _a.sent();
                    console.log("Cliente e Pedido inseridos com sucesso!");
                    return [3 /*break*/, 11];
                case 7:
                    error_1 = _a.sent();
                    console.error('Erro:', error_1);
                    if (!connection) return [3 /*break*/, 9];
                    return [4 /*yield*/, connection.rollback()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (connection) {
                        connection.release();
                    }
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
// Chamando a função para inserir cliente e pedido
insertClientePedido().catch(function (error) {
    console.error('Erro:', error);
});
