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
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var promise_1 = __importDefault(require("mysql2/promise")); // Usamos a versão 'promise' do módulo para suportar async/await
var path_1 = __importDefault(require("path")); // Para lidar com caminhos de arquivos
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Configuração do pool de conexões
var pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fatec',
    database: 'devweb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Configuração para servir arquivos estáticos (como CSS, JS)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Configuração do mecanismo de visualização EJS
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Rota para a página inicial
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, clientes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, pool.getConnection()];
            case 1:
                connection = _a.sent();
                return [4 /*yield*/, connection.query('SELECT cliente.id as cliente_id, cliente.nome as cliente_nome, pedido.descricao as pedido_descricao FROM cliente LEFT JOIN pedido ON cliente.id = pedido.cliente_id')];
            case 2:
                clientes = (_a.sent())[0];
                res.render('index', { clientes: clientes }); // Passando os clientes e seus pedidos para a view
                connection.release();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Erro:', error_1);
                res.status(500).send('Erro interno no servidor');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Rota para cadastrar cliente
app.post('/clientes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, rg, cpf, telefone, connection, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nome = _a.nome, rg = _a.rg, cpf = _a.cpf, telefone = _a.telefone;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, pool.getConnection()];
            case 2:
                connection = _b.sent();
                if (!(nome && rg && cpf && telefone)) return [3 /*break*/, 4];
                // Cadastro de cliente
                return [4 /*yield*/, connection.query('INSERT INTO cliente (nome, rg, cpf, telefone) VALUES (?, ?, ?, ?)', [nome, rg, cpf, telefone])];
            case 3:
                // Cadastro de cliente
                _b.sent();
                res.redirect('/'); // Redireciona de volta para a página inicial após o cadastro
                return [3 /*break*/, 5];
            case 4:
                // Campos inválidos
                res.status(400).send('Campos inválidos');
                _b.label = 5;
            case 5:
                connection.release();
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error('Erro:', error_2);
                res.status(500).send('Erro interno no servidor');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Rota para cadastrar pedido
app.post('/pedidos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, descricao, cliente_id, connection, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, descricao = _a.descricao, cliente_id = _a.cliente_id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, pool.getConnection()];
            case 2:
                connection = _b.sent();
                if (!(descricao && cliente_id)) return [3 /*break*/, 4];
                // Cadastro de pedido
                return [4 /*yield*/, connection.query('INSERT INTO pedido (cliente_id, descricao) VALUES (?, ?)', [cliente_id, descricao])];
            case 3:
                // Cadastro de pedido
                _b.sent();
                res.redirect('/'); // Redireciona de volta para a página inicial após o cadastro
                return [3 /*break*/, 5];
            case 4:
                // Campos inválidos
                res.status(400).send('Campos inválidos');
                _b.label = 5;
            case 5:
                connection.release();
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.error('Erro:', error_3);
                res.status(500).send('Erro interno no servidor');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
