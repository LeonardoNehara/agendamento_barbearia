<?php
namespace src\controllers;

use \core\Controller;
use \src\Config;
use src\models\AgendamentoModel;

class AgendamentoControllerClient extends Controller {

    // public function __construct() {
    //     if (!isset($_SESSION['token'])) {
    //         header("Location: " . Config::BASE_DIR . '/');
    //         exit();
    //     }
    // }

    public function index() {
            $this->render('agendamentoClient', ['base' => Config::BASE_DIR]);
    }

    public function getAgendamentos() {
        $barbeiro_id = isset($_GET['barbeiro']) ? $_GET['barbeiro'] : null;
        $agendamento = new AgendamentoModel();
        $ret = $agendamento->getAgendamentos($barbeiro_id);

        if ($ret['sucesso'] == true) {
            echo json_encode([["success" => true, "ret" => $ret['result']]]);
        } else {
            echo json_encode([["success" => false, "ret" => $ret['result']]]);
        }
        die;
    } 

    public function cadastro() {
        $cliente = $_POST["nome_completo"];
        $telefone = $_POST["telefone"];
        $datahora = $_POST["datahora"];
        $barbeiro_id = $_POST["barbeiro_id"];
        $servico_id = $_POST["servico_id"];
        $agendamento = new AgendamentoModel();

        $ret = $agendamento->cadastro($cliente, $telefone, $barbeiro_id, $servico_id, $datahora);

        if ($ret['sucesso'] == true) {
            echo json_encode(array([ "success" => true, "ret" => $ret ]));
            die;
        } else {
            echo json_encode(array([ "success" => false, "ret" => $ret ]));
            die;
        }
    }

    public function updateSituacaoAgendamento() {
        $id = $_POST['id'];
        $situacao = $_POST['situacao'];
        $agendamento = new AgendamentoModel();
        $ret = $agendamento->updateSituacao($id, $situacao);

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
        $cliente = $_POST['nome_completo'];
        $telefone = $_POST['telefone'];
        $barbeiro_id = $_POST['barbeiro_id'];
        $servico_id = $_POST['servico_id'];
        $datahora = $_POST['datahora'];

        $agendamento = new AgendamentoModel();
        $result = $agendamento->editar($id, $cliente, $telefone, $barbeiro_id, $servico_id, $datahora);

        if (!$result['sucesso']) {
            echo json_encode(array([ "success" => false, "result" => $result ]));
            die;
        } else {
            echo json_encode(array([ "success" => true, "result" => $result ]));
            die;
        }
    }
}
