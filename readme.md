### Vamos Começar

- Execute: npm i

- Tome um cafézinho

- Execute: npm start

- Agora a api está rodando 

### dump de registros.

- Primeiro verifique se você tem o MongoDB instalado em sua máquina

- Os registros solicitados estão todos na pasta ./dump

- Popule seu banco com o arquivo databaseInicial.json

- A partir de agora seu login será primeiro@gmail.com e a senha de acesso é primeiro

- Guarde essas informações! 

- Se api não estiver rodando localmente, altere o arquivo app.js, substitua o conteúdo da constate "urlServer", pelo IP que a api irá rodar

- Faça o mesmo processo com a constante "banco", coloque o nome do banco criado no mongo

- Na pasta models, no arquivo user.js, atualize o nome da coleção criada, na constante "colecao".

- Caso queira mais alguns usuários, popule seu banco com o arquivo databaseTeste.json

## Rotas da API


### Autenticação

- Login com email e senha
    POST
        /login

    body:
        {
            "email": "docatoAdmin@gmail.com",
            "senha": "docato2021"
        }

### Usuário

- Buscar os dados de um usuário em especifico

    GET
        /usuario/:id

- Buscar a lista de usuáriod

    GET 
        /usuarios

- Adicionar um novo usuário

    POST
        /usuario/cadastro

    body:
        {
            "nome": "nome do usuario",
            "email": "email@gmail.com",
            "cpf": "111.111.111-11",
            "nomeDeUsuario": "000000000",
            "senha": "senha",
        }

- Edita um usuário

    PUT
        /usuario/:id

    body:
        {
            "nome": "nome do usuario atualizado",
            "email": "email@gmail.com",
            "cpf": "111.111.111-11",
            "nomeDeUsuario": "000000000",
            "senha": "senha",
        }
    
- Remove um usuário

    delete
        /usuario/:id
    
- Produtos retornados pelo Crawler

    GET
        /docato/produtos
        
### Acessando o Frontend

- Acesse o link abixo e clone o repositório, e logo depois acesse o readme.md para continuar.
- `https://github.com/VictorLiima/frontEndTesteDocato`