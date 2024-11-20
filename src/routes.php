<?php
use core\Router;

$router = new Router();

// Login
$router->get('/', 'LoginController@index');
$router->post('/logar', 'LoginController@logar');
$router->get('/deslogar', 'LoginController@deslogar');

// Início
$router->get('/inicio', 'InicioController@index');
$router->get('/getsituacao', 'InicioController@getSituacao');
$router->get('/get-transportadora-dash', 'InicioController@getTransportadoraDash');
$router->get('/get-cd-dash', 'InicioController@getCdDash');
$router->get('/get-dashboard', 'InicioController@getDashBoard');
$router->get('/get-dashboard-qtd', 'InicioController@getTotalSolicitacoes');

// Dashboard
$router->get('/dashboard', 'DashboardController@index');

// Barbeiros
$router->get('/barbeiros', 'BarbeiroController@index');  // Página de barbeiros
$router->get('/getbarbeiros', 'BarbeiroController@getBarbeiros');  // Listagem de barbeiros
$router->post('/cadbarbeiro', 'BarbeiroController@cadastro');  // Cadastro de barbeiro
$router->post('/updateSituacaoBarbeiro', 'BarbeiroController@updateSituacaoBarbeiro');  // Atualizar situação do barbeiro
$router->post('/editarbarbeiro', 'BarbeiroController@editar');  // Editar barbeiro

// Cadastro de Usuário
$router->get('/usuario', 'UsuarioController@index');
$router->post('/cadusuario', 'UsuarioController@cadastro');
$router->get('/getusuarios', 'UsuarioController@getUsuarios');
$router->post('/updatesituacaousuario', 'UsuarioController@updateSituacaoUsuario');
$router->post('/editarusuario', 'UsuarioController@editar');

// Produtos
$router->get('/produtos', 'ProdutoController@index');  // Página de produtos
$router->get('/getProdutos', 'ProdutoController@getProdutos');  // Listagem de produtos
$router->post('/cadProduto', 'ProdutoController@cadastro');  // Cadastro de produto
$router->post('/editarProduto', 'ProdutoController@editar');  // Editar produto
$router->post('/updateSituacaoProduto', 'ProdutoController@updateSituacaoProduto');  // Atualizar situação do produto

// Serviços
$router->get('/servicos', 'ServicoController@index');  // Página de serviços
$router->get('/getservicos', 'ServicoController@getServicos');  // Listagem de serviços
$router->post('/cadservico', 'ServicoController@cadastro');  // Cadastro de serviço
$router->get('/editarservico', 'ServicoController@editar');  // Editar serviço
$router->post('/atualizarservico', 'ServicoController@atualizar');  // Atualizar serviço
$router->get('/updatesituacaoservico', 'ServicoController@updateSituacao');  // Atualizar situação do serviço

// Agendamentos
$router->get('/agendamentos', 'AgendamentoController@index');  // Página de agendamentos
$router->get('/getagendamentos', 'AgendamentoController@getAgendamentos');  // Listagem de agendamentos
$router->post('/cadagendamento', 'AgendamentoController@cadastro');  // Cadastro de agendamento
$router->get('/editaragendamento', 'AgendamentoController@editar');  // Editar agendamento
$router->post('/atualizarsituacaoagendamento', 'AgendamentoController@atualizarSituacao');  // Atualizar situação do agendamento
$router->get('/agendamento/{id}', 'AgendamentoController@obterAgendamento');  // Obter um agendamento específico pelo ID
$router->post('/editar-agendamento', 'AgendamentoController@editarAgendamento');  // Atualizar agendamento
$router->get('/excluir-agendamento', 'AgendamentoController@excluir');  // Excluir agendamento


