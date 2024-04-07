import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'fatec',
  database: 'devweb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export { pool };


// Função para inserir um cliente e um pedido usando uma transação
async function insertClientePedido() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Inserindo um cliente
    await connection.query("INSERT INTO cliente (nome, rg, cpf, telefone) VALUES ('Sophia Pussati', '123456', '123.456.789-10', '(11) 1234-5678')");

    // Pegando o ID do último cliente inserido
    const [rows] = await connection.query("SELECT LAST_INSERT_ID() AS id");
    const clienteId = rows[0].id;

    // Inserindo um pedido associado ao cliente
    await connection.query("INSERT INTO pedido (cliente_id, descricao) VALUES (?, 'Construtora')", [clienteId]);

    // Efetivando a transação
    await connection.commit();

    console.log("Cliente e Pedido inseridos com sucesso!");
  } catch (error) {
    console.error('Erro:', error);
    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Chamando a função para inserir cliente e pedido
insertClientePedido().catch(error => {
  console.error('Erro:', error);
});

  