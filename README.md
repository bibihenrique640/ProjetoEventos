```markdown
# Projeto Eventos

Este é um sistema de gerenciamento de eventos e presença, desenvolvido com front-end em HTML, CSS e JavaScript e back-end em PHP, com banco de dados MySQL. O sistema permite o registro de usuários, criação e edição de eventos, e confirmação de presença em eventos.

## Estrutura do Projeto

```plaintext
PROJETOEVENTOS/
│
├── config/                  # Configurações
│   └── database.php         # Configuração do banco de dados
│
├── public/                  # Arquivos públicos acessíveis pelo navegador
│   ├── index.html           # Página inicial
│   ├── administrador.html    # Página para administrador
│   ├── usuario.html         # Página para usuário comum
│   ├── js/                  # Scripts JavaScript
│   │   ├── administrador.js 
│   │   └── usuario.js       
│   └── css/
│       └── estilo.css       # Estilos CSS
│
├── src/                     # Lógica de back-end em PHP
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

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Banco de Dados**: MySQL

## Configuração do Banco de Dados

1. Crie um banco de dados no MySQL.
2. Configure as credenciais de acesso no arquivo `config/database.php`.
3. Execute as seguintes queries SQL para criar as tabelas necessárias:

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    tipo ENUM('usuario', 'administrador') DEFAULT 'usuario'
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    palestrante VARCHAR(100),
    data_evento DATE,
    local VARCHAR(100),
    capacidade INT,
    descricao TEXT
);

CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    evento_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id)
);
```

## Instruções de Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/bibihenrique640/ProjetoEventos.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd projeto-eventos
   ```
3. Configure o banco de dados conforme instruído acima.
4. Certifique-se de que o servidor web (Apache/Nginx) esteja configurado para apontar para a pasta `public` do projeto.

## Como Usar

- **Registro de Usuário**: Utilize a rota `POST /usuario/registrar` para registrar um novo usuário.
- **Autenticação de Usuário**: Utilize a rota `POST /usuario/autenticar` para autenticar um usuário.
- **Gerenciamento de Eventos**: 
  - Criação de evento: `POST /evento/criar`
  - Edição de evento: `PUT /evento/editar`
  - Exclusão de evento: `DELETE /evento/deletar`
  - Listagem de eventos: `GET /evento/listar`
- **Confirmação de Presença**: Utilize a rota `POST /presenca/confirmar`.
- **Listagem de Participantes**: Utilize a rota `GET /presenca/listar?evento_id=[ID_DO_EVENTO]`.

## Endpoints

### Usuários

- **Registrar Usuário**: `POST /usuario/registrar`
- **Autenticar Usuário**: `POST /usuario/autenticar`

### Eventos

- **Criar Evento**: `POST /evento/criar`
- **Editar Evento**: `PUT /evento/editar`
- **Deletar Evento**: `DELETE /evento/deletar`
- **Listar Eventos**: `GET /evento/listar`

### Presença

- **Confirmar Presença**: `POST /presenca/confirmar`
- **Listar Participantes**: `GET /presenca/listar?evento_id=[ID]`

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```
