# EduFlow Hub

Crie uma aplicação web moderna, profissional, responsiva e intuitiva para gerenciamento de uma plataforma educacional/treinamento, começando pela criação da tela inicial de Login e Cadastro.

1. Objetivo do sistema

O sistema deverá possuir três tipos distintos de usuários:

Gerente

Instrutor

Aluno

Cada tipo de usuário deverá possuir permissões e áreas específicas dentro do sistema.

A primeira tela apresentada ao usuário deve ser uma página de autenticação moderna, permitindo que ele faça login ou, caso ainda não possua uma conta, realize seu cadastro.

2. Tela inicial

Crie uma página inicial de autenticação com aparência profissional e moderna.

A tela deve conter:

Logo/nome da plataforma no topo.

Título principal: "Bem-vindo à plataforma"

Subtítulo: "Acesse sua conta para continuar"

Campo de E-mail

Campo de Senha

Botão principal "Entrar"

Link "Esqueci minha senha"

Separador visual com a palavra "ou"

Botão/link "Criar uma conta"

Também deve existir uma opção clara para selecionar o tipo de usuário:

"Como você deseja acessar?"

Apresente três opções visuais:

👔 Gerente

Descrição: "Gerencie a plataforma, usuários e atividades."

🎓 Instrutor

Descrição: "Gerencie suas turmas, alunos, atividades práticas, e crie ordens de serviço"

📚 Aluno

Descrição: "Acesse suas demandas, Ordens de serviço e histórico de demandas concluídas."

As três opções devem ser apresentadas como cards ou botões selecionáveis, com destaque visual para a opção atualmente escolhida.

3. Fluxo de Login

O usuário deverá primeiro selecionar seu tipo de perfil:

Gerente | Instrutor | Aluno

Depois deverá informar:

E-mail

Senha

Ao clicar em "Entrar", valide os dados de autenticação.

Caso os dados estejam incorretos, apresentar uma mensagem amigável:

"E-mail ou senha incorretos. Verifique seus dados e tente novamente."

Caso o login seja realizado com sucesso, direcionar o usuário automaticamente para o dashboard correspondente ao seu perfil.

Rotas sugeridas:

/gerente/dashboard

/instrutor/dashboard

/aluno/dashboard

4. Cadastro

Ao clicar em "Criar uma conta", abrir uma tela de cadastro.

Primeiramente, perguntar:

"Qual tipo de conta você deseja criar?"

Apresentar:

Gerente
Instrutor
Aluno

Cada opção deve possuir uma breve descrição.

Depois da seleção, mostrar o formulário correspondente.

Cadastro de Gerente

Campos:

Nome completo

E-mail

Senha

Confirmar senha

Telefone

Empresa/Instituição

Botão:

"Criar conta de Gerente"

Cadastro de Instrutor

Campos:

Nome completo

E-mail

Senha

Confirmar senha

Telefone

Área de atuação

Especialidade

Registro/identificação profissional, se aplicável

Botão:

"Criar conta de Instrutor"

Cadastro de Aluno

Campos:

Nome completo

E-mail

Senha

Confirmar senha

CPF ou matrícula

Data de nascimento

Telefone

Botão:

"Criar conta de Aluno"

5. Regras de validação

Implemente validações no frontend e prepare a estrutura para validações no backend.

Regras:

Todos os campos obrigatórios devem ser preenchidos.

Validar formato do e-mail.

A senha deve possuir pelo menos 8 caracteres.

A confirmação de senha deve ser igual à senha.

Não permitir cadastro com e-mail já existente.

Exibir mensagens de erro claras e objetivas.

Após cadastro realizado com sucesso, exibir uma mensagem de confirmação e direcionar o usuário para o login.

Exemplo:

"Cadastro realizado com sucesso! Agora você pode acessar sua conta."

6. Controle de acesso

O sistema deve utilizar autenticação baseada em usuário e função/role.

Criar três roles:

GERENTE
INSTRUTOR
ALUNO


O usuário autenticado somente poderá acessar as páginas permitidas para sua função.

Por exemplo:

Gerente não deve acessar diretamente páginas exclusivas de aluno.

Aluno não deve acessar páginas administrativas.

Instrutor não deve acessar funcionalidades exclusivas do gerente.

Caso tente acessar uma rota não autorizada, apresentar uma página de acesso negado:

"Você não possui permissão para acessar esta página."

Botão:

"Voltar para o início"

7. Dashboard inicial de cada perfil

Crie também uma estrutura inicial de dashboard para cada tipo de usuário.

Dashboard do Gerente

Exibir:

Saudação: "Olá, [Nome]"

Número de alunos

Número de instrutores

Número de cursos/turmas

Atividades recentes

Menu lateral com:

Dashboard

Usuários

Instrutores

Alunos

Cursos

Turmas

Relatórios

Configurações

Sair

Dashboard do Instrutor

Exibir:

Saudação: "Olá, [Nome]"

Minhas turmas

Total de alunos

Cursos/conteúdos

Atividades pendentes

Menu lateral com:

Dashboard

Minhas Turmas

Meus Alunos

Conteúdos

Atividades

Avaliações

Relatórios

Meu Perfil

Sair

Dashboard do Aluno

Exibir:

Saudação: "Olá, [Nome]"

Meus cursos

Meu progresso

Próximas atividades

Últimas notas/avaliações

Menu lateral com:

Dashboard

Meus Cursos

Atividades

Avaliações

Meu Progresso

Meu Perfil

Sair

8. Design da interface

Utilize um design moderno, limpo e profissional.

Características:

Layout responsivo para desktop, tablet e celular.

Interface com aparência de sistema SaaS profissional.

Cards com bordas arredondadas.

Sombras sutis.

Boa utilização de espaço em branco.

Tipografia moderna e legível.

Ícones consistentes.

Botões com estados de hover, active e disabled.

Animações suaves e discretas.

Feedback visual durante carregamentos.

Skeleton loaders quando apropriado.

Mensagens de sucesso e erro através de Toasts.

A tela de login deve ter destaque visual para a seleção dos três tipos de usuário.

Sugestão de layout:

Desktop:

Lado esquerdo:

Logo

Frase institucional

Breve apresentação da plataforma

Elemento visual/ilustração relacionada à educação e gestão

Lado direito:

Card de Login

Seleção do tipo de usuário

Campos de e-mail e senha

Botão de login

Link para cadastro

Mobile:

Centralizar o formulário, ocultando ou adaptando o painel lateral para não prejudicar a experiência.

9. Banco de dados e arquitetura

Prepare a aplicação para utilizar autenticação e banco de dados.

Caso utilize Supabase, crie a estrutura necessária para:

Tabela users / perfil do usuário

Campos sugeridos:

id

nome

email

telefone

role

created_at

updated_at

O campo role deve aceitar:

gerente
instrutor
aluno


Criar também a estrutura necessária para relacionar usuários aos seus respectivos perfis.

Utilizar boas práticas de segurança, autenticação e autorização.

Não armazenar senhas em texto puro.

Implementar controle de acesso baseado em roles e preparar Row Level Security (RLS) no Supabase, caso o Supabase seja utilizado.

10. Experiência do usuário

O fluxo deve ser simples:

Tela inicial
↓
Selecionar tipo de usuário
↓
Login ou Cadastro
↓
Autenticação
↓
Dashboard específico
↓
Funcionalidades permitidas para o perfil

O usuário deve sempre saber:

Em qual perfil está conectado.

Onde está dentro do sistema.

Como voltar ao dashboard.

Como sair da conta.

Adicionar no menu do usuário:

"Sair"

Ao clicar em sair, encerrar a sessão e retornar para:

/login

11. Estrutura de rotas

Criar inicialmente:

/login

/cadastro

/gerente/dashboard
/gerente/usuarios
/gerente/instrutores
/gerente/alunos
/gerente/cursos
/gerente/turmas
/gerente/relatorios
/gerente/configuracoes

/instrutor/dashboard
/instrutor/turmas
/instrutor/alunos
/instrutor/conteudos
/instrutor/atividades
/instrutor/avaliacoes
/instrutor/relatorios
/instrutor/perfil

/aluno/dashboard
/aluno/cursos
/aluno/atividades
/aluno/avaliacoes
/aluno/progresso
/aluno/perfil


Criar proteção de rotas baseada no role do usuário.

12. Requisitos técnicos

Utilize uma arquitetura organizada e escalável.

Preferências:

React

TypeScript

Tailwind CSS

Componentes reutilizáveis

Supabase para autenticação e banco de dados, se disponível

React Router para gerenciamento de rotas

Estrutura preparada para crescimento futuro

Separe adequadamente:

componentes

páginas

layouts

serviços

autenticação

hooks

tipos/interfaces

validações

Evite código duplicado.

Crie componentes reutilizáveis para:

Input

Button

Card

Modal

Toast

Sidebar

Header

UserMenu

RoleSelector

13. Resultado esperado

O resultado deve ser uma aplicação funcional, não apenas um protótipo visual.

A primeira experiência do usuário deverá ser:

Abrir /login.

Visualizar uma interface moderna.

Escolher entre Gerente, Instrutor ou Aluno.

Fazer login ou acessar o cadastro.

Criar sua conta.

Ser autenticado.

Ser direcionado ao dashboard correspondente.

Ter acesso somente às funcionalidades permitidas para seu perfil.

Priorize uma experiência visual profissional, facilidade de uso, segurança, responsividade e uma arquitetura que permita adicionar novas funcionalidades posteriormente.

Antes de finalizar, verifique se todas as rotas, componentes, validações, estados de carregamento, mensagens de erro e controles de acesso estão funcionando corretamente.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/61a3467a-6637-5576-a4bd-8e8fcd63326f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
