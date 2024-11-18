<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Usuario;

class UsuarioController extends Controller {
    
    public function __construct() {
        // Verificando apenas o token na sessão (removendo o idgrupo da sessão)
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        // Verificando se o usuário é admin (idgrupo == 1) antes de renderizar a página
        if ($_SESSION['token']) {  // Remover checagem do idgrupo
            $this->render('usuario', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    public function cadastro() {
        $dados = [];
        $dados['nome'] = $_POST["nome"];
        $dados['login'] = $_POST["login"];
        $dados['senha'] = $_POST["senha"];
        error_log("Dados recebidos para cadastro: " . print_r($dados, true)); 


        $cad = new Usuario();
        $hashedSenha = md5($dados['senha']); 
        // $hashedSenha = password_hash($dados['senha'], PASSWORD_DEFAULT);  
        $dados['senha'] = $hashedSenha;

        $ret = $cad->cadastro($dados); 
        if ($ret['sucesso'] == true) {
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
            die;
        } else {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
            die;
        }
    }

    public function getusuarios() {
        $list = new Usuario();
        $ret = $list->getusuarios();

        if ($ret['sucesso'] == false) {
            echo json_encode(array([ "success" => false, "ret" => $ret['result'] ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret['result'] ]));
            die;
        }
    }

    public function editar() {
        $dados = [];

        // Removendo idfilial e idgrupo do processo de edição
        $dados['idusuario'] = $_GET['idusuario'];
        $dados['login'] = $_GET['login'];
        $dados['nome'] = $_GET['nome'];

        $hashedSenha = md5($_GET['senha']); 

        $dados['senha'] = $hashedSenha;

        $editar = new Usuario();
        $result = $editar->editar($dados);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }   
    }


    public function updateSituacaoUsuario() {
        $id = $_GET['id'];
        $idsituacao = $_GET['idsituacao'];

        $cad = new Usuario();
        $ret = $cad->updateSituacao($id, $idsituacao);

        if (!$ret['sucesso']) {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
            die;
        }
    }
}
