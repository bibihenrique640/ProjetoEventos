```markdown
# Projeto Eventos

Este é um sistema de gerenciamento de eventos e presença, desenvolvido com front-end em HTML, CSS e JavaScript e back-end em PHP, com banco de dados MySQL. O sistema permite o registro de usuários, criação e edição de eventos, e confirmação de presença em eventos.

## 1. Estrutura do Projeto

```plaintext
MEU_PROJETO/
│
├── database/                     # Arquivo do banco de dados
|   ├── Dump20241029.sql                  # documento do banco de dados
|
├── public/                  # Arquivos públicos acessíveis pelo navegador
│   ├── .htaccess         # Configuração para as rotas
│   ├── index.html           # Página inicial
│   ├── administrador.html    # Página para administrador
│   ├── usuario.html         # Página para usuário comum
│   ├── index.php         # Página inicial para as rotas
│   ├── js/                  # Scripts JavaScript
│   │   ├── administrador.js 
│   │   └── usuario.js       
│   └── css/
│       └── estilo.css       # Estilos CSS
│
├── src/                     # Lógica de back-end em PHP
|   ├── config/                  # Configurações
|   │   └── database.php         # Configuração do banco de dados
│   ├── controllers/         # Controladores para gerenciar lógica de negócio
│   │   ├── UsuarioController.php
│   │   ├── EventoController.php
│   │   └── PresencaController.php
│   ├── models/              # Modelos para interações com o banco
│   │   ├── Usuario.php
│   │   ├── Evento.php
│   │   └── Presenca.php
│   └── routes.php           # Roteamento das requisições
│
└── README.md                # Documentação do projeto
```

## 2. Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Banco de Dados**: MySQL


# Documentação do Banco de Dados `cadastro_eventos`

## 1. Introdução

Este banco de dados gerencia informações de eventos e presenças para o sistema de registro de visitantes do museu. Ele armazena dados sobre usuários, visitantes, eventos e registros de presença. O sistema permite diferenciar administradores de usuários comuns e registra quais visitantes participaram de eventos específicos.

## 2. Estrutura do Banco de Dados

O banco de dados contém as seguintes tabelas principais:

- **admin**: registra administradores do sistema.
- **comum**: armazena dados de visitantes comuns.
- **eventos**: contém informações dos eventos.
- **presenca**: relaciona visitantes com eventos específicos, registrando a presença.
- **usuario**: tabela de usuários do sistema, com dados de tipo e vínculo com visitantes.

## 3. Descrição das Tabelas e Campos

### Tabela `admin`
Registra administradores do sistema.

| Nome do Campo | Tipo     | Chave       | NULL | Descrição                                                                                      |
|---------------|----------|-------------|------|------------------------------------------------------------------------------------------------|
| codAdmin      | FLOAT    | Primária    | Não  | Código único para o administrador                                                              |
| cpf           | CHAR(11) | Estrangeira | Não  | CPF do administrador, chave estrangeira para `usuario(cpf)` para vinculação com dados de usuário |

**Observações**: Esta tabela faz referência à tabela `usuario` para garantir que cada administrador seja um usuário do sistema.

### Tabela `comum`
Armazena dados dos visitantes comuns (não administradores).

| Nome do Campo | Tipo          | Chave       | NULL | Descrição                |
|---------------|---------------|-------------|------|--------------------------|
| nome          | VARCHAR(100)  | -           | Não  | Nome do visitante        |
| cpf           | CHAR(11)      | Primária    | Não  | CPF único do visitante   |

### Tabela `eventos`
Contém informações sobre os eventos.

| Nome do Campo    | Tipo          | Chave    | NULL | Descrição                               |
|------------------|---------------|----------|------|-----------------------------------------|
| nome             | VARCHAR(100)  | Primária | Não  | Nome do evento                          |
| data_ev          | DATE          | -        | Não  | Data de realização do evento            |
| local            | VARCHAR(100)  | -        | Não  | Local onde o evento será realizado      |
| capacidade_ev    | INT(11)       | -        | Sim  | Capacidade máxima de participantes      |
| palestrante      | VARCHAR(100)  | -        | Não  | Nome do palestrante responsável pelo evento |

### Tabela `presenca`
Armazena a presença dos visitantes nos eventos.

| Nome do Campo | Tipo          | Chave       | NULL | Descrição                                                |
|---------------|---------------|-------------|------|----------------------------------------------------------|
| nomeComum     | VARCHAR(100)  | -           | Não  | Nome do visitante que participou do evento               |
| cpfComum      | CHAR(11)      | Primária    | Não  | CPF do visitante, chave estrangeira para `comum(cpf)`    |
| evento_nome   | VARCHAR(100)  | Primária    | Não  | Nome do evento, chave estrangeira para `eventos(nome)`   |

**Observações**: Esta tabela relaciona visitantes com eventos, registrando a presença através de chaves estrangeiras para `comum` e `eventos`.

### Tabela `usuario`
Armazena dados dos usuários do sistema e o tipo de cada usuário.

| Nome do Campo | Tipo          | Chave       | NULL | Descrição                                            |
|---------------|---------------|-------------|------|------------------------------------------------------|
| nome          | VARCHAR(100)  | -           | Não  | Nome do usuário                                      |
| cpf           | CHAR(11)      | Primária    | Não  | CPF do usuário, chave estrangeira para `comum(cpf)`  |
| tipoUsuario   | VARCHAR(50)   | -           | Sim  | Tipo de usuário (por exemplo, "admin" ou "comum")    |

**Observações**: Esta tabela diferencia administradores de usuários comuns, vinculando o CPF do usuário com o CPF dos visitantes na tabela `comum`.

## 4. Relacionamentos

- **admin(cpf)** referencia **usuario(cpf)** para garantir que cada administrador é um usuário.
- **presenca(cpfComum)** referencia **comum(cpf)** para registrar a presença de visitantes.
- **presenca(evento_nome)** referencia **eventos(nome)** para associar visitantes a eventos específicos.
- **usuario(cpf)** referencia **comum(cpf)** para vincular informações de usuários com dados de visitantes.

## 5. Script SQL Completo

O script SQL é responsável pela criação de todas as tabelas e configuração dos relacionamentos mencionados acima.
