# buyQueue
É um projeto backend feito com o Framework AdonisJS, que faz o gerenciamento de clientes, endereço, telefone, produto e vendas. Abaixo listarei alguns requisitos e maneiras de rodar o projeto.

# Requisitos
Todos os links levam direto para o download.
- [VS Code](https://code.visualstudio.com/docs/?dv=win64user)
- [Node.js](https://nodejs.org/dist/v20.15.1/node-v20.15.1-x64.msi)
- [MySQL](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.1-winx64.msi)
- [MySQL Workbench](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.38-winx64.msi)

# Entrando no projeto
Para entrar no projeto primeiramente abra o VS Code e utilize esse comando no terminal(para abrir o terminal é "ctrl" +
"shift" + " ' "), e cole o comando a seguir e dê enter.

```bash
git clone https://github.com/LucasZanotto/buyQueue.git
```

Em seguida vá até a pasta principal do App:

```bash
cd .\buyQueue\back-end\
```

Copie e cole os seguintes comandos para instalar as dependências:
```bash
npm install -g @adonisjs/cli
```
```bash
npm i
```

Após isso rode esse comando para ligar o servidor

```bash
adonis serve --dev
```
Em seguida abra o MySQL Workbench, a senha para entrar será User: root, Password: root.
E Cole isso na Query:
```bash
CREATE DATABASE adonis;

INSERT INTO products (name, price, quantity, description) VALUES
('Geladeira', 10.45, 20, 'Eh uma geladeira duas portas'),
('Alicate', 20.30, 30, 'Eh uma alicate pequena'),
('Caneta', 33.33, 40, 'Eh uma caneta bem cara');

INSERT INTO clients (name, cpf) VALUES
('Lucas', '999.999.999-99'),
('Diego', '000.000.000-00');

INSERT INTO phones (client_id, number) VALUES
(1, '(55) 49999271760'),
(2, '(55) 00000000000');

INSERT INTO addresses (client_id, CEP, country, state, city, neighborhood, street, complement) VALUES
(1, 1, 'Brasil', 'RS', 'Pelotas', 'Floresta', 'Rua 19', 'Predio branco'),
(2, 2, 'Brasil', 'RS', 'Pelotas', 'Floresta', 'Rua 20', 'Do lado da escola');

INSERT INTO sales (client_id, product_id, quantity, unit_price, total_price, date_time) VALUES
(1, 1, 2, 20.20, 40.40, NOW()),
(2, 2, 1, 40.40, 40.40, NOW());
```
