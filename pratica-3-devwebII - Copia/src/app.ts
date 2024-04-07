import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // Usamos a versão 'promise' do módulo para suportar async/await
import path from 'path'; // Para lidar com caminhos de arquivos

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'fatec',
  database: 'devweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Configuração para servir arquivos estáticos (como CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do mecanismo de visualização EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota para a página inicial
app.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [clientes] = await connection.query('SELECT cliente.id as cliente_id, cliente.nome as cliente_nome, pedido.descricao as pedido_descricao FROM cliente LEFT JOIN pedido ON cliente.id = pedido.cliente_id');
    res.render('index', { clientes }); // Passando os clientes e seus pedidos para a view
    connection.release();
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

// Rota para cadastrar cliente
app.post('/clientes', async (req, res) => {
  const { nome, rg, cpf, telefone } = req.body;

  try {
    const connection = await pool.getConnection();

    // Verifica se todos os campos necessários foram fornecidos
    if (nome && rg && cpf && telefone) {
      // Cadastro de cliente
      await connection.query('INSERT INTO cliente (nome, rg, cpf, telefone) VALUES (?, ?, ?, ?)', [nome, rg, cpf, telefone]);
      res.redirect('/'); // Redireciona de volta para a página inicial após o cadastro
    } else {
      // Campos inválidos
      res.status(400).send('Campos inválidos');
    }

    connection.release();
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

// Rota para cadastrar pedido
app.post('/pedidos', async (req, res) => {
  const { descricao, cliente_id } = req.body;

  try {
    const connection = await pool.getConnection();

    // Verifica se todos os campos necessários foram fornecidos
    if (descricao && cliente_id) {
      // Cadastro de pedido
      await connection.query('INSERT INTO pedido (cliente_id, descricao) VALUES (?, ?)', [cliente_id, descricao]);
      res.redirect('/'); // Redireciona de volta para a página inicial após o cadastro
    } else {
      // Campos inválidos
      res.status(400).send('Campos inválidos');
    }

    connection.release();
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
