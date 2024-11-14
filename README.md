# Sistema de Gerenciamento de Eventos

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Estrutura de Pastas](#estrutura-de-pastas)
6. [Configurações do Banco de Dados](#configurações-do-banco-de-dados)
7. [Como Usar](#como-usar)
8. [Contribuições](#contribuições)
9. [Licença](#licença)

---

## 1. Descrição do Projeto

Este projeto é um sistema de gerenciamento de eventos desenvolvido para permitir que os administradores organizem eventos e que os usuários possam se inscrever neles. A aplicação permite a criação, visualização e gerenciamento de eventos, além da inscrição dos usuários com feedback visual e mensagens de sucesso ou erro.

## 2. Funcionalidades

- **Para Administradores**:
  - Criar eventos com nome, palestrante, data, local e capacidade.
  - Visualizar a lista de eventos.
  - Editar e excluir eventos.
  
- **Para Usuários**:
  - Visualizar eventos disponíveis.
  - Inscrever-se em eventos com nome e CPF.

## 3. Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP (usando PDO para conexão ao banco de dados)
- **Banco de Dados**: MySQL
- **Ambiente de Desenvolvimento**: XAMPP (Apache e MySQL)

## 4. Instalação e Configuração

1. **Clonar o Repositório**: Clone este repositório em sua máquina local.
   ```bash
   git clone https://github.com/bibihenrique640/ProjetoEventos.git
   ```
   
2. **Configurar o XAMPP**:
   - Coloque a pasta do projeto dentro da pasta `htdocs` do XAMPP.
   - Inicie o Apache e o MySQL no painel do XAMPP.

3. **Configurar o Banco de Dados**:
   - Acesse o phpMyAdmin (normalmente em [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).
   - Crie um banco de dados com o nome adequado (por exemplo, `sistema_eventos`).
   - Importe o arquivo `banco.sql` (ou configure as tabelas manualmente conforme descrito abaixo).

4. **Configurar a Conexão com o Banco**:
   - Edite o arquivo `config/db_connect.php` e atualize as credenciais do banco de dados conforme necessário:
     ```php
     <?php
     $host = 'localhost';
     $db = 'sistema_eventos';
     $user = 'root';
     $pass = '';
     
     try {
         $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
         $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     } catch (PDOException $e) {
         die("Erro ao conectar ao banco de dados: " . $e->getMessage());
     }
     ?>
     ```

## 5. Estrutura de Pastas

A estrutura do projeto é organizada da seguinte forma:

```
meu_projeto/
├── index.php                    # Redireciona para a página inicial
├── public/
│   ├── index.html                # Página inicial
│   ├── administrador.html         # Página do administrador
│   ├── usuario.html               # Página do usuário
│   ├── evento/
│   │   ├── criar.php              # Endpoint para criar eventos
│   │   ├── editar.php              # Endpoint para editar eventos
│   │   ├── excluir.php              # Endpoint para excluir eventos
│   │   └── listar.php             # Endpoint para listar eventos
│   ├── presenca/
│   │   └── confirmar.php          # Endpoint para confirmar inscrições
│   ├── css/
│   │   └── estilo.css             # Arquivo de estilos CSS
│   ├── js/
│       ├── administrador.js       # Scripts para administrador
│       └── usuario.js             # Scripts para usuário
└── config/
    └── db_connect.php             # Conexão com o banco de dados
```

## 6. Configurações do Banco de Dados

O banco de dados é composto por duas tabelas principais:

1. **Tabela `eventos`**:
   - Campos: `id`, `nome`, `palestrante`, `data_evento`, `local`, `capacidade`, `vagas_disponiveis`.

2. **Tabela `presencas`**:
   - Campos: `id`, `nome_participante`, `cpf_participante`, `evento_id`, `status_presenca`.

## 7. Como Usar

1. **Administrador**:
   - Acesse a página do administrador em `http://localhost/meu_projeto/public/administrador.html`.
   - Crie, edite ou exclua eventos usando o formulário.
   
2. **Usuário**:
   - Acesse a página do usuário em `http://localhost/meu_projeto/public/usuario.html`.
   - Visualize eventos e inscreva-se fornecendo seu nome e CPF.

