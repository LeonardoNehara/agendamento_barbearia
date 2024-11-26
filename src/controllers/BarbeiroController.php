<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\Barbeiro;

class BarbeiroController extends Controller {

    public function __construct(){
        if (!isset($_SESSION['token'])) {
            header("Location: " . Config::BASE_DIR . '/');
            exit();
        }
    }

    public function index() {
        if ($_SESSION['token']) {  
            $this->render('barbeiro', ['base' => Config::BASE_DIR]);
        } else {
            $this->render('404');
        }
    }

    public function getBarbeiros() {
        $cad = new Barbeiro();
        $ret = $cad->getBarbeiros();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret['result']]));
            die;
        }
    }

    public function getBarbeirosAtivos() {
        $cad = new Barbeiro();
        $ret = $cad->getBarbeirosAtivos();

        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret['result']]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret['result']]));
            die;
        }
    }

    public function cadastro() {
        $nome = $_POST["nome"];
        $telefone = $_POST["telefone"];
        $cad = new Barbeiro();
        $existe = $cad->verificarTelefone($telefone);

        if ($existe['result']['existeTelefone'] == 1) {
            echo json_encode(array(["success" => false,"ret" => $existe]));
            die;
        }

        $ret = $cad->cadastro($nome, $telefone);
        
        if ($ret['sucesso'] == true) {
            echo json_encode(array(["success" => true,"ret" => $ret]));
            die;
        } else {
            echo json_encode(array(["success" => false,"ret" => $ret]));
            die;
        }   
    }

    public function updateSituacaoBarbeiro() {
        $id = $_POST['id'];
        $idsituacao = $_POST['idsituacao'];
        $cad = new Barbeiro();
        $ret = $cad->updateSituacao($id, $idsituacao);

        if ($ret['sucesso'] == false) {
            echo json_encode(array([ "success" => false, "ret" => $ret['result'] ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "ret" => $ret['result'] ]));
            die;
        }
    }

    public function editar() {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $telefone = $_POST['telefone'];
        $editar = new Barbeiro();
        $result = $editar->editar($id, $nome, $telefone);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }  
    }
}
