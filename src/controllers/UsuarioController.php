<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Usuario;

class UsuarioController extends Controller {
    
    public function __construct() {
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        if ($_SESSION['token']) {  
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
        $cad = new Usuario();
        $hashedSenha = md5($dados['senha']); 
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
        $dados['idusuario'] = $_POST['idusuario'];
        $dados['login'] = $_POST['login'];
        $dados['nome'] = $_POST['nome'];
        $hashedSenha = md5($_POST['senha']); 
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
        $id = $_POST['idusuario'];
        $idsituacao = $_POST['idsituacao'];
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
