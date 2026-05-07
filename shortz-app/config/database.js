// arquivo: config/database.js

// carrega a classe 'Sequelize' do módulo 'sequelize'
const { Sequelize } = require('sequelize');
// carrega as variaveis de ambiente através do módulo 'dotenv'
require('dotenv').config();

// cria uma instância da classe 'Sequelize'
const sequelize = new Sequelize(
   // variáveis carregas do arquivo .env 
   // sobre o banco de dados
   process.env.DB_NAME,          // nome do banco de dados
   process.env.DB_USER,          // nome do usuário
   process.env.DB_PASSWORD,      // senha do usuário
   {
      // sobre o servidor
      host: process.env.DB_HOST, // endereço do servidor do banco de dados
      port: process.env.DB_PORT, // porta do servidor do banco de dados
      dialect: 'mysql',          // tipo do banco de dados
      logging: false,            // liga/desliga log de SQL no terminal
      define: {
         timestamps: true,       // cria os campos createdAt e updatedAt
         underscored: true       // usa a forma created_at e updated_at
      }
   }
);
// torna a instância 'sequelize' publica para uso
module.exports = sequelize;