# buyQueue 🛒
É um projeto backend feito com o Framework AdonisJS, que faz o gerenciamento de clientes, endereço, telefone, produto e vendas. Abaixo listarei alguns requisitos e maneiras de rodar o projeto.

</br>
# Requisitos 📋
Todos os links levam direto para o download.
- [VS Code](https://code.visualstudio.com/docs/?dv=win64user)
- [Node.js](https://nodejs.org/dist/v20.15.1/node-v20.15.1-x64.msi)
- [MySQL](https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.1-winx64.msi)
- [MySQL Workbench](https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community-8.0.38-winx64.msi)
- [Insomnia](https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app&source=website)
  
</br>
# Entrando no projeto 🚀
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
Lembre de renomear o arquivo ".env.example" para apenas ".env". </br>
E caso já esteja usando a porta 3306 troque para outra de sua preferência. </br>
Após isso rode esse comando para ligar o servidor.

```bash
adonis serve --dev
```
Em seguida abra o MySQL Workbench, a senha para entrar será User: root, Password: root.</br>
E Cole isso na Query:
```bash
CREATE DATABASE adonis;
USE adonis;

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
Você irá rodar a primeira linha individualmente selecionando apenas ela e pressionando "ctrl" + "Enter".</br>
Em seguida você vai rodar a segunda linha individualmente selecionando apenas ela e pressionando "ctrl" + "Enter".</br>
Após isso volte ao terminal do VS Code e crie um novo terminal no "+" e rode esse comando:
```bash
node ace migration:run
```
Após isso vá para o MySQL Workbench e rode as outras linhas, sem rodar a primeira nem a segunda, porém clickando naquele raiozinho ⚡</br>
Pronto agora seu banco está configurado e com informações dos seeders!!</br>
Próximo vai ser como testar a aplicação.

</br>
# Testando o projeto

</br>
## Rotas de Login
No seu insomnia utilize a rota para se registrar, com o metodo POST:
```bash
localhost:3333/register
```
Com o body:
```bash
{
	"email": "lucas@mail.com",
	"password": "123456"
} 
```
Logo em seguida use a rota login para pegar seu token de verificação, com o metodo POST:
```bash
localhost:3333/authenticate
```
Com o body:
```bash
{
	"email": "lucas@mail.com",
	"password": "123456"
}
```
Lembre-se a aplicação é protegida pelo token JWT que você adquiriu agora, então a qualquer rota que for acessar use o Auth e na parte de token coloque o que foi recebido da response. Caso tenha alguma dúvida o type é o "Bearer Token".
</br>
## Rotas de Cliente
Index: Lista todos os clientes ordenados pelo id, com o metodo GET:
```bash
localhost:3333/clients
```
Show: Detalha um cliente e suas vendas relacionadas são ordenadas de acordo com a mais recente, com o metodo GET:
```bash
localhost:3333/clients/1
```
Store: Cria um cliente, vai precisar desse body, com o metodo POST:
```bash
localhost:3333/clients
```
Request do body para criar:
```bash
{
	"name": "lucas",
	"cpf": "777.777.777-77"
}
```
Update: Para atualizar algum campo do cliente, com o metodo PATCH:
```bash
localhost:3333/clients/1
```
Request para criar no body:
```bash
{
	"name": "lucas zanotto"
}
```
Destroy: Para desabilitar um cliente, com o metodo DELETE:
```bash
localhost:3333/clients/2
```

</br>
## Rotas de Produto
Index: Mostra todos os produtos ordenados por ordem alfabetica, com o metodo GET:
```bash
localhost:3333/products
```
Show: Detalha um produto especifico, com o metodo GET:
```bash
localhost:3333/products/1
```
Store: Cria um novo produto, com o metodo POST:
```bash
localhost:3333/products
```
O body da request:
```bash
{
	"name": "Alface",
	"price": "10.50",
	"quantity": 40,
	"description": "Alimento bom para o dia-a-dia"
}
```
Update: Atualiza alguma informação do produto através do seu id, com o metodo PATCH.
```bash
localhost:3333/products/2
```
O body da request:
```bash
{
	"name": "Banana",
	"price": "10.50",
	"quantity": 40,
	"description": "Alimento bom para o dia-a-dia"
}
```
Destroy: Desabilita um produto, com o metodo DELETE.
```bash
localhost:3333/products/2
```

</br>
## Rota de Sale
Store: Cria uma venda para um cliente de um produto, nessa rota foi aplicado uma lógica onde a cada venda diminui a quantidade de tal produto comprado, além do total_price ser somando automáticamente, com o metodo POST.
```bash
{
	"client_id": 1,
	"product_id": 1,
	"quantity": 2,
	"unit_price": "20.50"
}
```

</br>
O meu projeto acaba aqui, espero que tenha atendido as expectativas!! </br>
Durante meu projeto usei como base um mapa mental que eu fiz no excalidraw https://excalidraw.com/#json=HZqxkIhVWPxezTs1Ut72m,QtvMbWZkZgwmxhLMoTLh6Q </br>
Caso tenha algum problema na aplicação especifico entre em contato comigo de alguma forma seja por: </br>
Email: lucasabatizanotto@gmail.com </br>
Whatsapp: 49 999271760 </br>
link: https://api.whatsapp.com/send?phone=5549999271760
