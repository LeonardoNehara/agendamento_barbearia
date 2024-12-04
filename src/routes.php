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
$router->get('/barbeiros', 'BarbeiroController@index');  
$router->get('/getbarbeiros', 'BarbeiroController@getBarbeiros'); 
$router->get('/getbarbeirosativos', 'BarbeiroController@getBarbeirosAtivos');
$router->post('/cadbarbeiro', 'BarbeiroController@cadastro');
$router->post('/updateSituacaoBarbeiro', 'BarbeiroController@updateSituacaoBarbeiro');
$router->post('/editarbarbeiro', 'BarbeiroController@editar');

// Cadastro de Usuário
$router->get('/usuario', 'UsuarioController@index');
$router->post('/cadusuario', 'UsuarioController@cadastro');
$router->get('/getusuarios', 'UsuarioController@getUsuarios');
$router->post('/updatesituacaousuario', 'UsuarioController@updateSituacaoUsuario');
$router->post('/editarusuario', 'UsuarioController@editar');

// Produtos
$router->get('/produtos', 'ProdutoController@index');
$router->get('/getProdutos', 'ProdutoController@getProdutos'); 
$router->post('/cadProduto', 'ProdutoController@cadastro');
$router->post('/editarProduto', 'ProdutoController@editar');
$router->post('/updateSituacaoProduto', 'ProdutoController@updateSituacaoProduto');

// Serviços
$router->get('/servicos', 'ServicoController@index');
$router->get('/getservicos', 'ServicoController@getServicos');
$router->get('/getservicosativos', 'ServicoController@getServicosAtivos');
$router->post('/cadServico', 'ServicoController@cadastro');
$router->post('/editarservico', 'ServicoController@editar');
$router->post('/atualizarservico', 'ServicoController@atualizar');
$router->post('/updateSituacao', 'ServicoController@updateSituacao');

// Agendamentos
$router->get('/agendamentos', 'AgendamentoController@index');
$router->post('/editarAgendamento', 'AgendamentoController@editar');
$router->get('/getagendamentos', 'AgendamentoController@getAgendamentos');
$router->post('/cadagendamento', 'AgendamentoController@cadastro');
$router->post('/updateSituacaoAgendamento', 'AgendamentoController@updateSituacaoAgendamento');

// Pages Cliente
$router->get('/agendamentosClient', 'AgendamentoControllerClient@index');

// Rota para listar agendamentos (página principal)
$router->get('/listar-agendamentos', 'ListarAgendamentoController@index');

// Rota para buscar todos os agendamentos (com filtros de barbeiro e cliente)
$router->get('/getlistaragendamentos', 'ListarAgendamentoController@getAgendamentos');




