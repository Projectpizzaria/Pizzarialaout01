import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Neon.tech
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Teste de conexão
sequelize.authenticate()
  .then(() => console.log('Conectado ao Neon.tech'))
  .catch(err => console.error('Erro ao conectar:', err));

// Criar uma API para o frontend acessar
app.get('/api/data', async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM minha_tabela");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Iniciar o servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
