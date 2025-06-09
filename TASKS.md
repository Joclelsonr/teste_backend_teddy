# Sobre o sistema:

#### O intuito é construir um sistema que encurte as URLs.

## Informações de desenvolvimento:

- ✅ Deverá ser implementado um projeto com NodeJS na última versão estável,
  sendo construído como API REST. Leve em consideração que o sistema será
  implementado em uma infraestrutura que escala verticalmente.

- ✅ O sistema deve possibilitar o cadastro de usuários e autenticação dos mesmos.

- ✅ O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para
  no máximo 6 caracteres. Exemplo:

  - Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda
  - Saída: http://localhost/aZbKq7

- ✅ Qualquer um pode solicitar que o URL seja encurtado e para encurtar deve existir
  apenas um endpoint, mas caso seja um usuário autenticado, o sistema deve
  registrar que o URL pertence ao usuário.

- ✅ Um usuário autenticado pode listar, editar o endereço de destino e excluir URLs encurtadas por ele.

- ✅ Todo acesso a qualquer URL encurtado deve ser contabilizado no sistema.

- ✅ Quando um usuário listar os urls deve aparecer na listagem a quantidade de
  cliques.

- ✅ Todos os registros devem ter uma forma de saber quando foram atualizados.

- ✅ Os registros só poderão ser deletados logicamente do banco, ou seja, deverá ter
  um campo que guarda a data de exclusão do registro, caso ela esteja nula é
  porque ele é válido, caso esteja preenchida é porque ele foi excluído e nenhuma operação de leitura ou escrita pode ser realizada por ele.

## Sobre a entrega:

- ✅ Construir uma estrutura de tabelas que faça sentido para o projeto usando um
  banco relacional.

- ✅ Construir endpoints para autenticação de e-mail e senha que retorna um Bearer
  Token.

- ✅ Construir apenas um endpoint para encurtar o URL, ele deve receber um URL de
  origem e deve aceitar requisições com e sem autenticação, deve retornar o url
  encurtado - incluindo o domínio..

- ✅ Definir o que deve e não deve ser variável de ambiente..

- ✅ Construir endpoints que aceitam apenas requisições autenticadas:

  - ✅ Listagem de URL Encurtados pelo usuário com contabilização de clicks
  - ✅ Deletar URL Encurtado
  - ✅ Atualizar a origem de um URL encurtado.

- ✅ README explicando como rodar o projeto.

- ✅ Construir um endpoint que ao receber um URL encurtado, redirecione o usuário
  para o URL de origem e contabilize.

## Entrega com diferencial:

- ✅ Utilizar docker-compose para subir o ambiente completo localmente.

- ✅ Ter testes unitários

- ✅ API está documentada com Swagger

- ✅ Ter validação de entrada em todos os lugares necessários.

- ✅ Dar deploy no ambiente em um cloud provider e expor no readme o link.

- ✅ Deixar no README pontos de melhoria para caso o sistema necessite escalar
  horizontalmente e quais serão os maiores desafios.

- ✅ Github actions para lint e testes automatizados.

- ✅ Configurar pré commit ou pre push hooks.

- ✅ Ter instrumentação de observabilidade, Logs com Sentry
