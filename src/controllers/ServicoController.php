<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Servico;

class ServicoController extends Controller {

    public function __construct(){
        // Verifica apenas o token na sessão (sem a necessidade de idgrupo)
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    // Página principal de cadastro de serviços
    public function index() {
        if ($_SESSION['token']) {  // Usuário autenticado
            $this->render('servicos', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    // Buscar todos os serviços cadastrados
    public function getServicos() {
        $cad = new Servico();
        $ret = $cad->getServicos();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret['result']]));
            die;
        }
    }

    // Cadastro de novo serviço
    public function cadastro() {
        $nome = $_POST["nome"];
        $valor = $_POST["valor"];
        $tempoMinutos = $_POST["tempoMinutos"];

        $cad = new Servico();
        
        // Verifica se o serviço já está cadastrado pelo nome
        $existe = $cad->verificarServico($nome);
        
        if ($existe['result']['existeServico'] == 1) {
            echo json_encode(array(["success" => false,"ret" => $existe]));
            die;
        }

        // Realiza o cadastro
        $ret = $cad->cadastro($nome, $valor, $tempoMinutos);
        
        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret]));
            die;
        }   
    }

    // Atualizar situação do serviço (Ativo/Inativo)
    public function updateSituacao() {
        $id = $_POST['id'];
        $idsituacao = $_POST['idsituacao'];

        $cad = new Servico();
        $ret = $cad->updateSituacao($id, $idsituacao);

        if ($ret['sucesso'] == false) {
            echo json_encode(array([ "success" => false, "ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret['result']]));
            die;
        }
    }

    // Editar dados do serviço
    public function editar() {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $valor = $_POST['valor'];
        $tempoMinutos = $_POST['tempoMinutos'];

        $editar = new Servico();
        $result = $editar->editar($id, $nome, $valor, $tempoMinutos);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }  
    }
}
